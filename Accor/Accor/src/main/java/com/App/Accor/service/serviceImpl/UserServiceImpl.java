package com.App.Accor.service.serviceImpl;

import com.App.Accor.model.User;
import com.App.Accor.model.UserNotFoundException;
import com.App.Accor.repository.BranchRepository;
import com.App.Accor.repository.UserRepository;
import com.App.Accor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BranchRepository branchRepository;


    @Override
    public List<User> userList() {
       return userRepository.findAll();
    }

    @Override
    public Optional<User> userListId(Long id) {
        return userRepository.findById(id);
    }

	@Override
	public Optional<User> dispId(Long id) {
		return userRepository.findById(id);
	}

	@Override
    public User add(User user) {
        return userRepository.save(user);

    }

    @Override
    public User edit(User user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(final Long id) {
        Optional<User>user = userRepository.findById(id);
        if (user != null){
            userRepository.delete(user.get());
        }
    }



	public void updateResetPasswordToken(String token, String username) throws UserNotFoundException {
		User user = userRepository.findByEmail(username);
		if (user != null) {
			user.setResetPasswordToken(token);
			userRepository.save(user);
		} else {
			throw new UserNotFoundException("Could not find any customer with the email " + username);
		}
	}

	public User getByResetPasswordToken(String token) {
		return userRepository.findByResetPasswordToken(token);
	}

	public void updatePassword(User user, String newPassword) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(newPassword);
		user.setPassword(encodedPassword);

		user.setResetPasswordToken(null);
		userRepository.save(user);
	}
}
