package com.viggo.accor.model;

import java.util.HashSet;
import java.util.Set;

public enum ERole {
	ROLE_GM,
	ROLE_COMPANYADMIN,
	ROLE_MASTERADMIN;

	public static Set<ERole> ConvertFromString(Set<String> role) {
		Set<ERole> roles = new HashSet<>();
		role.forEach(str -> roles.add(ERole.valueOf(str)));
		return roles;
	}
}
