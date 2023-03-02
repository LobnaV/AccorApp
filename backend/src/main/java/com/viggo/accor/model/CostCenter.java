package com.viggo.accor.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(uniqueConstraints = {
	@UniqueConstraint(columnNames = {"code", "company_id"})
})
@AllArgsConstructor
@NoArgsConstructor
public class CostCenter implements Serializable {
//Seulement pour la partie NE
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String code;

	private String label;

	private String owner;

	private String firstName;

	private String LastName;

	@ManyToOne
	private CompanyParameter company;

}
