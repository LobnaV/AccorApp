package com.App.Accor.service;

import com.App.Accor.model.Company;
import com.App.Accor.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CompanyService {
    List<Company> companyList();
    Optional<Company> companyListId(String id);
    Company add(Company company);
    Company edit(Company company);
    void delete(String id);
}
