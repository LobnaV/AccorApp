package com.viggo.accor.playload;

import lombok.Data;

import java.io.Serializable;

@Data
public class CsvFormatDTO implements Serializable {

	private String branchId;

	private String home;

	private String email;

	private String firstName;

	private String lastName;

	private String state;

	private String manager;

	private String approvalLimit;

	private String spendLimit;

	private String ownedCostCenter;

	private String userType;
}
