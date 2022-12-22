package com.viggo.accor.service;

import com.viggo.accor.model.CompanyParameter;
import com.viggo.accor.model.CostCenter;
import com.viggo.accor.model.Staff;
import com.viggo.accor.model.User;
import com.viggo.accor.playload.CodingListFormat;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CostCenterService {

	@Autowired
	private CostCenterRepository costCenterR;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private StaffRepository staffRepository;

	@Autowired
	private SftpUploadService sftpUploadService;

	@Autowired
	private SftpCodingListSevice sftpCodingListSevice;

	public List<CostCenter> findByCompanyId(Long idCompagnie) {
		return costCenterR.findByCompanyId(idCompagnie);
	}

	public List<CostCenter> costCenterList() {
		return costCenterR.findAll();
	}

	@Transactional(readOnly = true)
	public CostCenter findById(Long id) {
		return costCenterR.findById(id)
			.orElseThrow();
	}

	public CostCenter postSave(CostCenter costCenter) {

		List<CodingListFormat> codingList = new ArrayList<>();
		List<CostCenter> costCenters = costCenterR.findByCompanyId(costCenter.getCompany().getId());
		costCenters.forEach(oneCostCenter -> {
			CodingListFormat csvFormatCodingList = new CodingListFormat();
			csvFormatCodingList.setMegaCodeCostCenter_ID(oneCostCenter.getCompany().getMegaCode() + " - " + oneCostCenter.getCode());
			csvFormatCodingList.setMegaCodeCostCenter_Label(oneCostCenter.getCompany().getName() + " - " + oneCostCenter.getLabel());
			csvFormatCodingList.setApprover(oneCostCenter.getOwner());
			codingList.add(csvFormatCodingList);

			System.out.println(csvFormatCodingList.getMegaCodeCostCenter_ID());
			System.out.println(csvFormatCodingList.getMegaCodeCostCenter_Label());
			System.out.println(csvFormatCodingList.getApprover());
		});
		try {
			sftpCodingListSevice.uploadFileToSftp(codingList);

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return null;
	}


	public CostCenter save(CostCenter costCenter) throws Exception {

		CostCenter costCenterSaved = costCenterR.save(costCenter);


		List<CodingListFormat> codingList = new ArrayList<>();
			List<CostCenter> costCenters = costCenterR.findByCompanyId(costCenter.getCompany().getId());
			costCenters.forEach(oneCostCenter -> {
				CodingListFormat csvFormatCodingList = new CodingListFormat();
				csvFormatCodingList.setMegaCodeCostCenter_ID(oneCostCenter.getCompany().getMegaCode() + " - " + oneCostCenter.getCode());
				csvFormatCodingList.setMegaCodeCostCenter_Label(oneCostCenter.getCompany().getName() + " - " + oneCostCenter.getLabel());
				csvFormatCodingList.setApprover(oneCostCenter.getOwner());
				codingList.add(csvFormatCodingList);

			});
			try {
				sftpCodingListSevice.uploadFileToSftp(codingList);

			} catch (Exception e) {
				throw new RuntimeException(e);
			}
		return costCenterSaved ;

	}



	public CostCenter  updateOwner(Long id, String email, boolean isStaff) {
		costCenterR.updateOwner(id, email);
		CostCenter costCenter= findById(id);

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
		try {
			//String branchCode = tradeshiftInterface.getPrimaryBranchUser(companyParameter.getUserGM().getUsername());
		//	csvFormatDTO.setHome(branchCode.equals(companyParameter.getBranch().getCode()) ? "TRUE" : "FALSE");
			sftpUploadService.uploadFileToSftp(csvFormatDTO);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return costCenter;
	}

	public void delete(final Long id) {
		Optional<CostCenter> costCenter = costCenterR.findById(id);
		costCenter.ifPresent(center -> costCenterR.delete(center));
	}
}
