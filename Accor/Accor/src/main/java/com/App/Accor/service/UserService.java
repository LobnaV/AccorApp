package com.App.Accor.service;

import com.App.Accor.model.User;
import com.App.Accor.model.UserNotFoundException;
import com.App.Accor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public List<User> userList() {
		return userRepository.findAll();
	}

	public Optional<User> userListId(Long id) {
		return userRepository.findById(id);
	}

	public Optional<User> dispId(Long id) {
		return userRepository.findById(id);
	}

	public User add(User user) {
 /*       Set<Company> companyList = user.getCompanies();
        for (var company:companyList) {
            if (company.getBranch().getPerimeter() == EPerimeter.NE && !user.getCostCenters().isEmpty()){
                return userRepository.save(user);

            }else if (company.getBranch().getPerimeter() == EPerimeter.SE && user.getCostCenters().isEmpty())
                return userRepository.save(user);

        }return null;*/
		return userRepository.save(user);

	}

	public User edit(User user) {
		return userRepository.save(user);
	}

	public void delete(final Long id) {
		Optional<User> user = userRepository.findById(id);
		user.ifPresent(value -> userRepository.delete(value));
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
