package com.App.Accor.repository;

import com.App.Accor.model.CompanyParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyParameterRepository extends JpaRepository<CompanyParameter, Long> {

	Optional<CompanyParameter> findByUserGMUsername(String username);
}
