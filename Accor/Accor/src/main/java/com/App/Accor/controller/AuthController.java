package com.App.Accor.controller;

import com.App.Accor.model.ERole;
import com.App.Accor.model.Role;
import com.App.Accor.model.User;
import com.App.Accor.playload.request.LoginRequest;
import com.App.Accor.playload.request.SignupRequest;
import com.App.Accor.playload.response.JwtResponse;
import com.App.Accor.playload.response.MessageResponse;
import com.App.Accor.repository.RoleRepository;
import com.App.Accor.repository.UserRepository;
import com.App.Accor.security.JwtUtils;
import com.App.Accor.service.serviceImpl.detailsImpl.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/api/auth/login")
	public ResponseEntity<?> authentication(@Valid @RequestBody LoginRequest loginRequest){
		Authentication authentication = authenticationManager.authenticate(
			new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
			.map(GrantedAuthority::getAuthority)
			.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt,
			userDetails.getId(),
			userDetails.getUsername(),
			roles));
	}

	@PostMapping("/api/auth/signin")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest){
		if (userRepository.existsByUsername(signupRequest.getUsername())){
			return ResponseEntity
				.badRequest()
				.body(new MessageResponse("Error: Username is already taken!"));
		}
	/*	if (userRepository.existsByUsername(signupRequest.getUsername())){
			return ResponseEntity
				.badRequest()
				.body(new MessageResponse("Error: Email is already in use!"));
		}*/
		//Create new user's account
		User user = new User(signupRequest.getUsername(),
			passwordEncoder.encode(signupRequest.getPassword()),
			signupRequest.getFirstName(),
			signupRequest.getLastName());

		Set<ERole> strRoles = ERole.ConvertFromString(signupRequest.getRoles());
		Set<Role> roles = new HashSet<>();

//		if (strRoles.isEmpty()){
//			Role userRole = roleRepository.findByName(ERole.ROLE_GM)
//				.orElseThrow(() -> new RuntimeException("Error: Role is not found"));
//			roles.add(userRole);
//		}else{
//			signupRequest.getRoles().forEach(role ->{
//				Role currentRole = roleRepository.findByName( ERole.valueOf(role))
//					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//				roles.add(currentRole);
//
//			});
//		}

//		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
}
