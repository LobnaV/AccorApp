package com.App.Accor.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
		@Email
		@NotNull
		@Column(unique=true)
		private String username;
    private String firstName;
    private String lastName;
		private String password;
    private String type;
		private String primaryBranch;
		private String selectCompany;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles",
		joinColumns = @JoinColumn(name = "user_id"),
		inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	   @ManyToMany()
    private Set<Company>companies = new HashSet<>();


    //@JsonIgnore
  /*  @OneToMany()
    private Set<CostCenter> costCenters = new HashSet<>();
*/


	public User(String username, String encode, String firstName, String lastName) {
		this.username = username;
		this.password = encode;
		this.firstName = firstName;
		this.lastName = lastName;
	}
}
