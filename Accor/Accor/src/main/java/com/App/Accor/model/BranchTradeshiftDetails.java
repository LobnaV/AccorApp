package com.App.Accor.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class BranchTradeshiftDetails implements Serializable {

	@JsonProperty
	private String CompanyName;

	@JsonProperty
	private String CompanyAccountId;

	@JsonProperty
	private List<IdentifierTradeShift> Identifiers;

}
