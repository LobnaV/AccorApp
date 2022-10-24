package com.App.Accor.service;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.model.Staff;
import com.App.Accor.model.User;
import com.App.Accor.playload.CsvFormatDTO;
import com.App.Accor.repository.CompanyParameterRepository;
import com.App.Accor.repository.StaffRepository;
import com.App.Accor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

	public CompanyParameter save(CompanyParameter companyParameter) throws Exception {
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
		csvFormatDTO.setHome("TRUE");
		csvFormatDTO.setEmail(paramSaved.getUserGM().getUsername());
		csvFormatDTO.setFirstName(paramSaved.getUserGM().getFirstName());
		csvFormatDTO.setLastName(paramSaved.getUserGM().getLastName());
		csvFormatDTO.setState("ACTIVE");
		csvFormatDTO.setManager(paramSaved.getUserGM().getUsername());
		csvFormatDTO.setApprovalLimit("10000");
		csvFormatDTO.setSpendLimit("10000");
		csvFormatDTO.setOwnedCostCenter(paramSaved.getMegaCode());
		csvFormatDTO.setUserType("General Manager");

		// mettre ici le csv qui est generer pour ts les HOD a la modif d un info de leur GM?? a verifier avec Mohamed

		List<CsvFormatDTO> staffCsv = new ArrayList<>();
		List<Staff> staffs = staffRepository.findByCompanyParameterId(1l);
		staffs.forEach(staff -> {
		//CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
			csvFormatDTO.setBranchId(paramSaved.getBranch().getCode());
			csvFormatDTO.setHome("TRUE");
			csvFormatDTO.setEmail(staff.getMail());
			csvFormatDTO.setFirstName(staff.getFirstName());
			csvFormatDTO.setLastName(staff.getLastName());
			csvFormatDTO.setState("ACTIVE");
			csvFormatDTO.setManager(paramSaved.getUserGM().getUsername());
			csvFormatDTO.setApprovalLimit("10000");
			csvFormatDTO.setSpendLimit("10000");
			csvFormatDTO.setOwnedCostCenter(paramSaved.getMegaCode());
			csvFormatDTO.setUserType("General Manager");
			staffCsv.add(csvFormatDTO);
		});


		try {
		//	String branchCode = tradeshiftInterface.getPrimaryBranchUser(companyParameter.getUserGM().getUsername());
		//	csvFormatDTO.setHome(branchCode.equals(paramSaved.getBranch().getCode()) ? "TRUE" : "FALSE");
			//csvFormatDTO.setOwnedCostCenter(paramSaved.getMail().equals(companyParameter.getDispacherMail()) ? companyParameter.getMegaCode() : "" );
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
		parameterRepository.deleteById(id);
	}

	public CompanyParameter updateDispacher(Long id, String email, boolean isStaff) {
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
			String branchCode = tradeshiftInterface.getPrimaryBranchUser(companyParameter.getUserGM().getUsername());
			csvFormatDTO.setHome(branchCode.equals(companyParameter.getBranch().getCode()) ? "TRUE" : "FALSE");
			sftpUploadService.uploadFileToSftp(csvFormatDTO);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return companyParameter;
	}
}
