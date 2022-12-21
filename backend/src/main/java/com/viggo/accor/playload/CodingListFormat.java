package com.App.Accor.playload;

import lombok.Data;

import java.io.Serializable;

@Data
public class CodingListFormat implements Serializable {

	private String MegaCodeCostCenter_ID;

	private String MegaCodeCostCenter_Label;

	private String Approver;
}
