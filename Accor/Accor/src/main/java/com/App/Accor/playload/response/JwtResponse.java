package com.App.Accor.playload.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private Long idJwtResp;
	private String username;
	private List<String> roles;

	public JwtResponse(String accessToken,Long idJwtResp,String username, List<String> roles) {
		this.token = accessToken;
		this.idJwtResp = idJwtResp;
		this.username = username;
		this.roles = roles;
	}
}
