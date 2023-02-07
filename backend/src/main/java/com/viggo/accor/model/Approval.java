package com.viggo.accor.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Approval {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	private Category category;

	private Long value;
}
