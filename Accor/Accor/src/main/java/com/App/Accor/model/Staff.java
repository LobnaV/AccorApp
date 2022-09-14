package com.App.Accor.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Collection;

@Data
@Entity
@Table
public class Staff implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Email
	@NotNull
	@Column(unique = true)
	private String mail;

	private String firstName;

	private String lastName;

	@ManyToOne
	@NotNull
	private CompanyParameter companyParameter;
}
