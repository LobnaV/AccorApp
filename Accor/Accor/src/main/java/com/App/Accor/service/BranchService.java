package com.App.Accor.service;

import com.App.Accor.model.Branch;
import com.App.Accor.model.CompanyParameter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public interface BranchService {
    List<Branch> branchList();
    Optional<Branch> listId(Long id);
    Branch add(Branch branch );
    Branch edit(Branch  branch );
    void deleteBranch(Long id);

    //placement provisoire

   /* List<CompanyParameter> companyList();
    Optional<CompanyParameter> listIdCompany(Long id);
    CompanyParameter addCompany(CompanyParameter company );
    CompanyParameter editCompany(CompanyParameter company);
    void deleteCompany(Long id);*/

}
