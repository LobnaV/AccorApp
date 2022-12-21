package com.App.Accor.repository;

import com.App.Accor.model.CompanyParameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyParameterRepository extends JpaRepository<CompanyParameter, Long> {

	Optional<CompanyParameter> findByUserGMUsername(String username);

	List<CompanyParameter> findByBranchId(Long idBranch);


	@Modifying
	@Query("update CompanyParameter u set u.dispacherMail = :mail where u.id = :id")
	void updateDispacher(@Param("id") Long id, @Param("mail") String mail);
}
