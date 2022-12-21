package com.App.Accor.repository;

import com.App.Accor.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
//	Optional<Role> findByName(ERole name);

}
