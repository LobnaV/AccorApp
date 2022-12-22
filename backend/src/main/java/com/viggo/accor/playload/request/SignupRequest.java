package com.viggo.accor.playload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequest {
	private Long id;

	@NotBlank
	@Email
	private String username;

	@NotBlank
	private String firstName;

	@NotBlank
	private String lastName;


	private Set<String> roles = new HashSet<>();

	@NotBlank
	private String password;
}
