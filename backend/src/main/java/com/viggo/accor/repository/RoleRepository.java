package com.viggo.accor.repository;

import com.viggo.accor.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
//	Optional<Role> findByName(ERole name);

}
