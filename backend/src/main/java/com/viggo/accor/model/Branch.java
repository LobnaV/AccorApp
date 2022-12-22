package com.viggo.accor.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Collection;


@Data
@Entity
@Table
public class Branch implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	@NotNull
	private String code;

	private String name;

	/*@ManyToMany
		@JoinTable(
		name = "branches_users",
		joinColumns = @JoinColumn(
			name = "branch_id", referencedColumnName = "id"),
		inverseJoinColumns = @JoinColumn(
			name = "user_id", referencedColumnName = "id"))
	private Collection<User> userMGM;*/

	@ManyToOne(cascade = CascadeType.ALL)
	private User userMGM;


	//	@NotNull
	@Enumerated(EnumType.STRING)
	private EPerimeter perimeter;
}
