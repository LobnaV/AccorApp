package com.App.Accor.service.serviceImpl;

import com.App.Accor.model.Branch;
import com.App.Accor.model.CompanyParameter;
import com.App.Accor.repository.BranchRepository;
import com.App.Accor.repository.CompanyParameterRepository;
import com.App.Accor.service.BranchService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BranchServiceImpl implements BranchService {

    @Autowired
    private BranchRepository branchR;
    @Autowired
    private CompanyParameterRepository companyR;

    @Override
    public List<Branch> branchList() {
        return branchR.findAll();
    }

    @Override
    public Optional<Branch> listId(Long id) {
        return branchR.findById(id);
    }

    @Override
    public Branch add(Branch branch) {
        return branchR.save(branch);
   }

    @Override
    public Branch edit(Branch branch) {
        return branchR.save(branch);
    }

    @Override
    public void deleteBranch(final Long id) {
        Optional<Branch>branch = branchR.findById(id);
        if (branch != null){
            branchR.delete(branch.get());
        }

    }

   /* @Override
    public List<CompanyParameter> companyList() {
        return companyR.findAll();
    }

    @Override
    public Optional<CompanyParameter> listIdCompany(Long id) {
        return companyR.findById(id);
    }

    @Override
    public CompanyParameter addCompany(CompanyParameter company) {
        return companyR.save(company);
    }

    @Override
    public CompanyParameter editCompany(CompanyParameter company) {
        return companyR.save(company);
    }

    @Override
    public void deleteCompany(final Long id) {
        Optional<CompanyParameter>company = companyR.findById(id);
        if (company != null){
            companyR.delete(company.get());
        }
    }*/



}
