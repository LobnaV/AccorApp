package com.App.Accor.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Category {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private ECategory name;

	private String approvalLimitGM;

	private String approvalLimitN1;

	private String approvalLimitN2;


}
