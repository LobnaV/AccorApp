package com.viggo.accor.service;

import com.viggo.accor.model.*;
import com.viggo.accor.playload.CsvFormatDTO;
import com.viggo.accor.repository.CompanyParameterRepository;
import com.viggo.accor.repository.CostCenterRepository;
import com.viggo.accor.repository.StaffRepository;
import com.viggo.accor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CompanyParamService {

	@Autowired
	private CompanyParameterRepository parameterRepository;

	@Autowired
	private UserRepository userRepository;

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

	public CompanyParameter save(CompanyParameter companyParameter, String accessToken) throws Exception {
		User user = companyParameter.getUserGM();
		if (user.getId() != null) {
			User oldUser = userRepository.findById(user.getId())
				.orElseThrow(() -> new Exception("Impossible de trouver l'utilisateur associé"));
			oldUser.setFirstName(user.getFirstName());
			oldUser.setLastName(user.getLastName());
			oldUser.setUsername(user.getUsername());
			user = oldUser;
		}
		companyParameter.setUserGM(userRepository.save(user));

		CompanyParameter paramSaved = parameterRepository.save(companyParameter);

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId(paramSaved.getBranch().getCode());
		csvFormatDTO.setEmail(paramSaved.getUserGM().getUsername());
		csvFormatDTO.setFirstName(paramSaved.getUserGM().getFirstName());
		csvFormatDTO.setLastName(paramSaved.getUserGM().getLastName());
		csvFormatDTO.setState("ACTIVE");
		csvFormatDTO.setManager(paramSaved.getUserGM().getUsername());
		csvFormatDTO.setApprovalLimit("10000");
		csvFormatDTO.setSpendLimit("10000");
		//csvFormatDTO.setOwnedCostCenter(paramSaved.getMegaCode());
		csvFormatDTO.setUserType("General Manager");


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
			staffCsv.add(csvFormatStaff);
		});
		try {
			String branchCode = tradeshiftInterface.getPrimaryBranchUser(companyParameter.getUserGM().getUsername(), accessToken);
			csvFormatDTO.setHome(branchCode == null || branchCode.equals(paramSaved.getBranch().getCode()) ? "TRUE" : "FALSE");
//			csvFormatDTO.setHome("TRUE");
			csvFormatDTO.setOwnedCostCenter(paramSaved.getUserGM().getUsername().equals(companyParameter.getDispacherMail()) ? companyParameter.getMegaCode() : "" );
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

		if (isStaff) {
			Staff staff = staffRepository.findByMail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Staff Not Found with mail : " + email));
			nom = staff.getLastName();
			prenom = staff.getFirstName();
			userType = "Head of Department";
		} else {
			User user = userRepository.findByUsername(email)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with mail : " + email));
			nom = user.getLastName();
			prenom = user.getFirstName();
			userType = "General Manager";
		}

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId(companyParameter.getBranch().getCode());
		csvFormatDTO.setEmail(email);
		csvFormatDTO.setFirstName(prenom);
		csvFormatDTO.setLastName(nom);
		csvFormatDTO.setState("ACTIVE");
		csvFormatDTO.setManager(companyParameter.getUserGM().getUsername());
		csvFormatDTO.setApprovalLimit("0");
		csvFormatDTO.setSpendLimit("0");
		csvFormatDTO.setOwnedCostCenter(companyParameter.getMegaCode());
		csvFormatDTO.setUserType(userType);
		try {
			String branchCode = tradeshiftInterface.getPrimaryBranchUser(companyParameter.getUserGM().getUsername(), accessToken);
			csvFormatDTO.setHome(branchCode == null || branchCode.equals(companyParameter.getBranch().getCode()) ? "TRUE" : "FALSE");
//			csvFormatDTO.setHome("TRUE");
			sftpUploadService.uploadFileToSftp(csvFormatDTO);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return companyParameter;
	}
}
