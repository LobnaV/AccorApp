package com.App.Accor.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Role {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(length = 20)
	@Enumerated(EnumType.STRING)
	private ERole name;
}
