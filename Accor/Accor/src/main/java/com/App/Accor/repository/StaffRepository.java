package com.App.Accor.repository;

import com.App.Accor.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

	List<Staff> findByCompanyParameterId(Long idCompagnie);

	Optional<Staff> findByMail(String mail);
}
