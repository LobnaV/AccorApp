package com.App.Accor.service;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.model.Staff;
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
	private CompanyParamService companyParamService;

	public List<Staff> findByCompagnie(Long idCompagnie) {
		return staffRepository.findByCompanyParameterId(idCompagnie);
	}

	@Transactional(readOnly = true)
	public Staff findById(Long id) {
		return staffRepository.findById(id)
			.orElseThrow(() -> new UsernameNotFoundException("Staff Not Found with id : " + id));
	}

	public Staff save(Staff staff) {
		return staffRepository.save(staff);
	}

	public void delete(Long id) {
		Staff staff = findById(id);
		CompanyParameter companyParameter = staff.getCompanyParameter();
		if (staff.getMail().equals(companyParameter.getDispacherMail())) {
			companyParameter.setDispacherMail(companyParameter.getUserGM().getUsername());
			companyParamService.save(companyParameter);
		}
		staffRepository.deleteById(id);
	}
}
