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

	@ManyToOne
	private User userMGM;

	@Enumerated(EnumType.STRING)
	private EPerimeter perimeter;
}
