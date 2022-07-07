package com.App.Accor.service;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CompanyParameterService {
    List<CompanyParameter> paramList();
    Optional<CompanyParameter> paramId(Long id);
    CompanyParameter addParam(CompanyParameter param);
    CompanyParameter editParam(CompanyParameter param);
    void deleteParam(Long id);
}
