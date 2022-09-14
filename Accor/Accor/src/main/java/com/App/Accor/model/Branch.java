package com.App.Accor.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;


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

	private String countryCode;

	@ManyToOne
	private User userMGM;

//	@NotNull
	@Enumerated(EnumType.STRING)
	private EPerimeter perimeter;
}
