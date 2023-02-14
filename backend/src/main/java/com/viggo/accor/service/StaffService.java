package com.viggo.accor.service;

import com.viggo.accor.model.CompanyParameter;
import com.viggo.accor.model.Staff;
import com.viggo.accor.playload.CsvFormatDTO;
import com.viggo.accor.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestHeader;

import javax.validation.ConstraintViolationException;
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

	@Transactional(rollbackFor = Exception.class)
	public Staff save(Staff staff, String accessToken) throws Exception {
		Staff staffSaved;
		try {
			staffSaved = staffRepository.save(staff);
		} catch (DataIntegrityViolationException | ConstraintViolationException e) {
			throw new Exception("uniqueStaffMail");
		}
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
			String branchCode = tradeshiftInterface.getPrimaryBranchUser(companyParameter.getUserGM().getUsername(), accessToken);
			csvFormatDTO.setHome(branchCode == null || branchCode.equals(staffSaved.getCompanyParameter().getBranch().getCode()) ? "TRUE" : "FALSE");
			csvFormatDTO.setOwnedCostCenter(staffSaved.getMail().equals(companyParameter.getDispacherMail()) ? companyParameter.getMegaCode() : "" );
			sftpUploadService.uploadFileToSftp(csvFormatDTO);

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return staffSaved;

	}

	public void delete(Long id, String accessToken) throws Exception {
		Staff staff = findById(id);
		CompanyParameter companyParameter = staff.getCompanyParameter();
		if (staff.getMail().equals(companyParameter.getDispacherMail())) {
			companyParameter.setDispacherMail(companyParameter.getUserGM().getUsername());
			companyParamService.save(companyParameter, accessToken);
		}
		staffRepository.deleteById(id);

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId(companyParameter.getBranch().getCode());

		csvFormatDTO.setEmail(staff.getMail());
		csvFormatDTO.setFirstName(staff.getFirstName());
		csvFormatDTO.setLastName(staff.getLastName());
		//csvFormatDTO.setState("LOCKED");
		csvFormatDTO.setManager(companyParameter.getUserGM().getUsername());
		csvFormatDTO.setApprovalLimit("0");
		csvFormatDTO.setSpendLimit("0");
		csvFormatDTO.setOwnedCostCenter(companyParameter.getMegaCode());
		csvFormatDTO.setUserType("Head of Department");
		try {
			String branchCode = tradeshiftInterface.getPrimaryBranchUser(companyParameter.getUserGM().getUsername(), accessToken);
			csvFormatDTO.setHome(branchCode == null || branchCode.equals(companyParameter.getBranch().getCode()) ? "TRUE" : "FALSE");
//			csvFormatDTO.setHome("TRUE");
			csvFormatDTO.setOwnedCostCenter(staff.getMail().equals(companyParameter.getDispacherMail())? companyParameter.getMegaCode() : "");
			csvFormatDTO.setState(csvFormatDTO.getHome().equals("TRUE")? "LOCKED" : "REMOVE");
			sftpUploadService.uploadFileToSftp(csvFormatDTO);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
