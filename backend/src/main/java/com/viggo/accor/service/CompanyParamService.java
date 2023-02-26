package com.viggo.accor.service;

import com.viggo.accor.model.*;
import com.viggo.accor.playload.CsvFormatDTO;
import com.viggo.accor.repository.CompanyParameterRepository;
import com.viggo.accor.repository.CostCenterRepository;
import com.viggo.accor.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static com.viggo.accor.utils.ConstantsUtils.getApprovalLimit;

@Service
@Transactional
public class CompanyParamService {

	@Autowired
	private CompanyParameterRepository parameterRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private StaffRepository staffRepository;

	@Autowired
	private CostCenterRepository costCenterRepository;

	@Autowired
	private TradeshiftInterface tradeshiftInterface;

	@Autowired
	private SftpUploadService sftpUploadService;

	public List<CompanyParameter> findByBranch(Long idBranch) {
		return parameterRepository.findByBranchId(idBranch);
	}

	public CompanyParameter findByUserGM() throws Exception {
		UserDetails userDetails =
			(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return parameterRepository.findByUserGMUsername(userDetails.getUsername()).orElseThrow(() -> new Exception("Impossible de trouver l'hotel associé"));
	}

	@Transactional(rollbackFor = Exception.class)
	public CompanyParameter save(CompanyParameter companyParameter, String accessToken) throws Exception {
		User user = companyParameter.getUserGM();
		if (user.getId() != null) {
			User oldUser = userService.findById(user.getId());
			oldUser.setFirstName(user.getFirstName());
			oldUser.setLastName(user.getLastName());
			oldUser.setUsername(user.getUsername());
			user = oldUser;
		}

		try {
			companyParameter.setUserGM(userService.saveDefaultUserGM(user));
		} catch (DataIntegrityViolationException e) {
			throw new Exception("uniqueMailGM");
		}

		CompanyParameter paramSaved;
		try {
			paramSaved = parameterRepository.save(companyParameter);
		} catch (DataIntegrityViolationException e) {
			throw new Exception("uniqueMegaCode");
		}

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId(paramSaved.getBranch().getCode());
		csvFormatDTO.setEmail(paramSaved.getUserGM().getUsername());
		csvFormatDTO.setFirstName(paramSaved.getUserGM().getFirstName());
		csvFormatDTO.setLastName(paramSaved.getUserGM().getLastName());
		csvFormatDTO.setState("ACTIVE");
		csvFormatDTO.setManager(paramSaved.getGeneralManagerN1Mail());

		if (companyParameter.getBranch().getPerimeter().equals(EPerimeter.Southern_Europe)) {
			if (paramSaved.getUserGM().getUsername().equals(paramSaved.getDispacherMail())) {
				csvFormatDTO.setOwnedCostCenter(paramSaved.getMegaCode());
				csvFormatDTO.setApprovalLimit("0");
				csvFormatDTO.setSpendLimit("0");
			} else {
				csvFormatDTO.setOwnedCostCenter("");
				csvFormatDTO.setApprovalLimit(getApprovalLimit(paramSaved.getCategory()));
				csvFormatDTO.setSpendLimit(csvFormatDTO.getApprovalLimit());
			}
		} else {
			csvFormatDTO.setOwnedCostCenter("");
			csvFormatDTO.setApprovalLimit("");
			csvFormatDTO.setSpendLimit("");
		}

		csvFormatDTO.setUserType("General Manager");
		String branchCode = tradeshiftInterface.getPrimaryBranchUser(companyParameter.getUserGM().getUsername(), accessToken);
		csvFormatDTO.setHome(branchCode == null || branchCode.equals(paramSaved.getBranch().getCode()) ? "TRUE" : "FALSE");


		List<CsvFormatDTO> staffCsv = new ArrayList<>();
		staffCsv.add(csvFormatDTO);
		List<Staff> staffs = staffRepository.findByCompanyParameterId(companyParameter.getId());
		staffs.forEach(staff -> {
			CsvFormatDTO csvFormatStaff = new CsvFormatDTO();
			csvFormatStaff.setBranchId(paramSaved.getBranch().getCode());
			csvFormatStaff.setHome("TRUE");
			csvFormatStaff.setEmail(staff.getMail());
			csvFormatStaff.setFirstName(staff.getFirstName());
			csvFormatStaff.setLastName(staff.getLastName());
			csvFormatStaff.setState("ACTIVE");
			csvFormatStaff.setManager(paramSaved.getUserGM().getUsername());
			csvFormatStaff.setApprovalLimit("0");
			csvFormatStaff.setSpendLimit("0");
			csvFormatStaff.setOwnedCostCenter(staff.getMail().equals(companyParameter.getDispacherMail()) ? companyParameter.getMegaCode() : "" );
			csvFormatStaff.setUserType("Head of Department");
			String branchCodeStaff = tradeshiftInterface.getPrimaryBranchUser(staff.getMail(), accessToken);
			csvFormatStaff.setHome(branchCodeStaff == null || branchCodeStaff.equals(paramSaved.getBranch().getCode()) ? "TRUE" : "FALSE");
			staffCsv.add(csvFormatStaff);
		});
		try {
			sftpUploadService.uploadFileToSftp(staffCsv);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

		return paramSaved;
	}

	@Transactional(readOnly = true)
	public CompanyParameter findById(Long id) {
		return parameterRepository.findById(id)
			.orElseThrow(() -> new UsernameNotFoundException("Staff Not Found with id : " + id));
	}

	public void delete(Long id) {
		staffRepository.deleteAllByCompanyParameterId(id);
		costCenterRepository.deleteAllByCompanyId(id);
		parameterRepository.deleteById(id);
	}

	public CompanyParameter updateDispacher(Long id, String email, boolean isStaff, String accessToken) {
		parameterRepository.updateDispacher(id, email);
		CompanyParameter companyParameter = findById(id);

		String nom;
		String prenom;
		String userType;
		String manager;
		String approvalLimit;
		String spendLimit;

		if (isStaff) {
			Staff staff = staffRepository.findByMail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Staff Not Found with mail : " + email));
			nom = staff.getLastName();
			prenom = staff.getFirstName();
			userType = "Head of Department";
			manager = companyParameter.getGeneralManagerN1Mail();
			approvalLimit = "0";
			spendLimit = "0";
		} else {
			User user = userService.findByUsername(email);
			nom = user.getLastName();
			prenom = user.getFirstName();
			userType = "General Manager";
			manager = companyParameter.getUserGM().getUsername();
			if (email.equals(companyParameter.getDispacherMail())) {
				approvalLimit = "0";
				spendLimit = "0";
			} else {
				approvalLimit = getApprovalLimit(companyParameter.getCategory());
				spendLimit = approvalLimit;
			}
		}

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId(companyParameter.getBranch().getCode());
		csvFormatDTO.setEmail(email);
		csvFormatDTO.setFirstName(prenom);
		csvFormatDTO.setLastName(nom);
		csvFormatDTO.setState("ACTIVE");
		csvFormatDTO.setManager(manager);
		csvFormatDTO.setUserType(userType);
		csvFormatDTO.setApprovalLimit(approvalLimit);
		csvFormatDTO.setSpendLimit(spendLimit);
		if (email.equals(companyParameter.getDispacherMail())) {
			csvFormatDTO.setOwnedCostCenter(companyParameter.getMegaCode());
		} else {
			csvFormatDTO.setOwnedCostCenter("");
		}
		try {
			String branchCode = tradeshiftInterface.getPrimaryBranchUser(email, accessToken);
			csvFormatDTO.setHome(branchCode == null || branchCode.equals(companyParameter.getBranch().getCode()) ? "TRUE" : "FALSE");
			sftpUploadService.uploadFileToSftp(csvFormatDTO);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return companyParameter;
	}
}
