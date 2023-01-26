package com.viggo.accor.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Entity
@Table
public class CompanyParameter implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Branch branch;

	@Column(unique = true)
	private String megaCode;

	private String name;

	@OneToOne
	private Category category;

	@NotNull
	private String generalManagerN1Mail;

	@OneToOne
	@NotNull
	private User userGM;

	private String dispacherMail;


}
