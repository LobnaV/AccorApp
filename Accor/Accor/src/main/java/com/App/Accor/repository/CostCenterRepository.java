package com.App.Accor.repository;

import com.App.Accor.model.CostCenter;
import com.App.Accor.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CostCenterRepository extends JpaRepository<CostCenter, Long> {
	List<CostCenter> findByCompanyId(Long idCompagnie);


	@Modifying
	@Query("update CostCenter u set u.owner = :mail where u.id = :id")
	void updateOwner(@Param("id") Long id, @Param("mail") String mail);
}
