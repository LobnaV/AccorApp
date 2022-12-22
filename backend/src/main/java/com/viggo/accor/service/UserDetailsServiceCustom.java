package com.viggo.accor.service;

import com.viggo.accor.model.User;
import com.viggo.accor.model.UserDetails;
import com.viggo.accor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceCustom implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	@Override
	@Transactional
	public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username : " + username));

		return UserDetails.build(user);
	}
}
