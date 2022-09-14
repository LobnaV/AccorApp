package com.App.Accor.repository;

import com.App.Accor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	@Override
	List<User> findAll();

	@Query("SELECT x FROM User x WHERE x.username = ?1")
	User findByEmail(String username);

	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	User findByResetPasswordToken(String token);


}
