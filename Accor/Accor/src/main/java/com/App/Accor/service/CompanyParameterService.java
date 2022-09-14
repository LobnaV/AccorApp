package com.App.Accor.service;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.repository.CompanyParameterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CompanyParameterService {

	@Autowired
	private CompanyParameterRepository parameterRepository;

	public CompanyParameter paramList(String username) throws Exception {
		return parameterRepository.findByUserGMUsername(username).orElseThrow(() -> new Exception("Impossible de trouver l'hotel associé"));
	}

	public Optional<CompanyParameter> paramId(Long id) {
		return parameterRepository.findById(id);
	}

	public CompanyParameter addParam(CompanyParameter param) {
		return parameterRepository.save(param);
	}

	public CompanyParameter editParam(CompanyParameter param) {
		return parameterRepository.save(param);
	}

	public void deleteParam(final Long id) {
		Optional<CompanyParameter> param = parameterRepository.findById(id);
		param.ifPresent(companyParameter -> parameterRepository.delete(companyParameter));
	}
}
