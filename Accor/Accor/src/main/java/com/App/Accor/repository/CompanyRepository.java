package com.App.Accor.repository;

import com.App.Accor.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

@Repository
@CrossOrigin("*")
@Transactional
public interface CompanyRepository extends JpaRepository<Company, String> {
}
