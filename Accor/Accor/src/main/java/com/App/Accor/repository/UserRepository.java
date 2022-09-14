package com.App.Accor.repository;

import com.App.Accor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	@Override
	List<User> findAll();

	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);


}
