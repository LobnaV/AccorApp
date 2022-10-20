package com.App.Accor.service;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.model.Staff;
import com.App.Accor.playload.CsvFormatDTO;
import com.App.Accor.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StaffService {

	@Autowired
	private StaffRepository staffRepository;

	@Autowired
	private TradeshiftInterface tradeshiftInterface;

	@Autowired
	private SftpUploadService sftpUploadService;

	@Autowired
	private CompanyParamService companyParamService;

	public List<Staff> findByCompagnie(Long idCompagnie) {
		return staffRepository.findByCompanyParameterId(idCompagnie);
	}

	@Transactional(readOnly = true)
	public Staff findById(Long id) {
		return staffRepository.findById(id)
			.orElseThrow(() -> new UsernameNotFoundException("Staff Not Found with id : " + id));
	}

	public Staff save(Staff staff) throws Exception {
		Staff staffSaved = staffRepository.save(staff);
		CompanyParameter companyParameter = staff.getCompanyParameter();
		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId(companyParameter.getBranch().getCode());
		csvFormatDTO.setEmail(staff.getMail());
		csvFormatDTO.setFirstName(staff.getFirstName());
		csvFormatDTO.setLastName(staffSaved.getLastName());
		csvFormatDTO.setState("ACTIVE");
		csvFormatDTO.setManager(companyParameter.getUserGM().getUsername());
		csvFormatDTO.setApprovalLimit("0");
		csvFormatDTO.setSpendLimit("0");
		csvFormatDTO.setUserType("Head of Department");
		try {
			String branchCode = tradeshiftInterface.getPrimaryBranchUser(companyParameter.getUserGM().getUsername());
			csvFormatDTO.setHome(branchCode.equals(staffSaved.getCompanyParameter().getBranch().getCode()) ? "TRUE" : "FALSE");
			csvFormatDTO.setOwnedCostCenter(staffSaved.getMail().equals(companyParameter.getDispacherMail()) ? companyParameter.getMegaCode() : "" );
			sftpUploadService.uploadFileToSftp(csvFormatDTO);

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return staffSaved;

	}

	public void delete(Long id) {
		Staff staff = findById(id);
		CompanyParameter companyParameter = staff.getCompanyParameter();
		if (staff.getMail().equals(companyParameter.getDispacherMail())) {
			companyParameter.setDispacherMail(companyParameter.getUserGM().getUsername());
			companyParamService.save(companyParameter);
		}
		staffRepository.deleteById(id);

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId(companyParameter.getBranch().getCode());
		csvFormatDTO.setEmail(staff.getMail());
		csvFormatDTO.setFirstName(staff.getFirstName());
		csvFormatDTO.setLastName(staff.getLastName());
		csvFormatDTO.setState("DELETE");//Ou remove ajouter la condition
		csvFormatDTO.setManager(companyParameter.getUserGM().getUsername());
		csvFormatDTO.setApprovalLimit("0");
		csvFormatDTO.setSpendLimit("0");
		csvFormatDTO.setOwnedCostCenter(companyParameter.getMegaCode());//vide pas de dispatcher supprimer
		csvFormatDTO.setUserType("Head of Department");
		try {
			String branchCode = tradeshiftInterface.getPrimaryBranchUser(companyParameter.getUserGM().getUsername());
			csvFormatDTO.setHome(branchCode.equals(companyParameter.getBranch().getCode()) ? "TRUE" : "FALSE");
			//csvFormatDTO.setOwnedCostCenter(staff.getMail().equals(companyParameter.getDispacherMail())? companyParameter.getMegaCode() : "");
			sftpUploadService.uploadFileToSftp(csvFormatDTO);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
