package com.viggo.accor.repository;

import com.viggo.accor.model.CostCenter;
import com.viggo.accor.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CostCenterRepository extends JpaRepository<CostCenter, Long> {
	List<CostCenter> findByCompanyId(Long idCompagnie);

	void deleteAllByCompanyId(long paramId);

	@Modifying
	@Query("update CostCenter u set u.owner = :mail where u.id = :id")
	void updateOwner(@Param("id") Long id, @Param("mail") String mail);
}
