package com.viggo.accor.repository;

import com.viggo.accor.model.Branch;
import com.viggo.accor.model.CompanyParameter;
import com.viggo.accor.model.EPerimeter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {

	Optional<Branch> findByUserMGMUsername(String username);
	List<Branch> findAll();

}
