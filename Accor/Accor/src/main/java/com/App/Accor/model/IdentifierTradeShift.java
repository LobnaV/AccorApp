package com.App.Accor.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
public class IdentifierTradeShift implements Serializable {

	@JsonProperty
	private String scheme;

	@JsonProperty
	private String value;
}
