package com.App.Accor.service;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.repository.CompanyParameterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CompanyParamService {

	@Autowired
	private CompanyParameterRepository parameterRepository;

	public CompanyParameter findByUserGM() throws Exception {
		UserDetails userDetails =
			(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return parameterRepository.findByUserGMUsername(userDetails.getUsername()).orElseThrow(() -> new Exception("Impossible de trouver l'hotel associé"));
	}

	public CompanyParameter save(CompanyParameter companyParameter) {
		return parameterRepository.save(companyParameter);
	}

	@Transactional(readOnly = true)
	public CompanyParameter findById(Long id) {
		return parameterRepository.findById(id)
			.orElseThrow(() -> new UsernameNotFoundException("Staff Not Found with id : " + id));
	}

	public void delete(Long id) {
		parameterRepository.deleteById(id);
	}
}
