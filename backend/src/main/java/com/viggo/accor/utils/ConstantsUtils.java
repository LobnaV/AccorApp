package com.viggo.accor.utils;

import com.viggo.accor.model.Category;

public class ConstantsUtils {

	private ConstantsUtils() {

	}

	public final static String Ultra_ECO = "Ultra_ECO";
	public final static String Portugal_Spain = "Portugal_Spain";
	public final static String ECO = "ECO";
	public final static String MidScale_Luxe = "MidScale_Luxe";

	public static String getApprovalLimit(Category category) {
		switch (category.getCode()) {
			case Ultra_ECO :
				return "10 000";
			case ECO :
			case Portugal_Spain :
				return "50 000";
			case MidScale_Luxe :
				return "100 000";
			default :
				return "";
		}
	}
}
