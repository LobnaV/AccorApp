package com.App.Accor.repository;

import com.App.Accor.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@Repository
@CrossOrigin("*")
@Transactional
public interface UserRepository extends JpaRepository<User,Long> {
    @Override
    List<User> findAll();

}
