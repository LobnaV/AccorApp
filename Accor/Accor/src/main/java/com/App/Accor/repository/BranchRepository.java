package com.App.Accor.repository;

import com.App.Accor.model.Branch;
import com.App.Accor.model.CompanyParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {

	Optional<Branch> findByUuid(String uuid);
	Optional<Branch> findByUserMGMUsername(String username);

}
