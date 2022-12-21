package com.App.Accor.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Approval {
//Seulement pour la partie SE
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(cascade = CascadeType.ALL)
	private Category categoryID;

	@OneToOne(cascade = CascadeType.ALL)
	private CompanyParameter companyID;

	//a verifier!
	private String approvalLimitGM;//attribuer a ts les GM de la branches

	private String approvalLimitN1;// attribuer a ts les GM N+1 de la branches

	private String approvalLimitN2;// attribuer a ts les GM N+2 de la branches


}
