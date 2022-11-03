package com.App.Accor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.Collection;

@Data
@Entity
@Table
@NoArgsConstructor
public class User implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Email
	@NotNull
	@Column(unique = true)
	private String username;

	private String firstName;

	private String lastName;

	private String password;

	private String primaryBranch;

	@JsonIgnore
	private String resetKey;

	private Instant resetDate = null;

	private String approvalLimit ;

	private String spendLimit ;

	@ManyToMany
	@JoinTable(
		name = "users_roles",
		joinColumns = @JoinColumn(
			name = "user_id", referencedColumnName = "id"),
		inverseJoinColumns = @JoinColumn(
			name = "role_id", referencedColumnName = "id"))
	private Collection<Role> roles;

	public User(String username, String encode, String firstName, String lastName) {
		this.username = username;
		this.password = encode;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
