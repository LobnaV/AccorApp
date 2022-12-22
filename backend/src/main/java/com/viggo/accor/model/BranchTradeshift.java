package com.viggo.accor.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class BranchTradeshift implements Serializable {

	@JsonProperty
	private String OverridingCompagnyAccountId;

	@JsonProperty
	private String CompanyAccountId;

	@JsonProperty
	private String UserName;

	@JsonProperty
	private String State;
}
