package com.App.Accor.service;

import com.App.Accor.model.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {
    List<User> userList();
    Optional<User> userListId(Long id);
    User add(User user);
    User edit(User user);
		Optional<User> dispId(Long id);
    void delete(Long id);
}
