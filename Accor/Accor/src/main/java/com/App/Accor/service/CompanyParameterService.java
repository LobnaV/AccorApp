package com.App.Accor.service;

import com.App.Accor.model.CompanyParameter;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface CompanyParameterService {
	CompanyParameter paramList(String username) throws Exception;

	Optional<CompanyParameter> paramId(Long id);

	CompanyParameter addParam(CompanyParameter param);

	CompanyParameter editParam(CompanyParameter param);

	void deleteParam(Long id);
}
