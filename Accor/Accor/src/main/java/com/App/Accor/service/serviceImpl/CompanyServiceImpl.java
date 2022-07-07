package com.App.Accor.service.serviceImpl;

import com.App.Accor.model.Company;
import com.App.Accor.repository.CompanyRepository;
import com.App.Accor.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyR;

    @Override
    public List<Company> companyList() {
        return companyR.findAll();
    }

    @Override
    public Optional<Company> companyListId(String id) {
        return companyR.findById(id);
    }

    @Override
    public Company add(Company company) {
        return null;
    }

  /*  @Override
    public Company add(Company company) {
        if(!company.getBranch().getBranch_Id().isEmpty()){
          return companyR.save(company);

        }return null;
    }*/

    @Override
    public Company edit(Company company) {
        return companyR.save(company);
    }

    @Override
    public void delete(final String id) {
        Optional<Company> company = companyR.findById(id);
            if (company != null){
                companyR.delete(company.get());
            }
    }
}
