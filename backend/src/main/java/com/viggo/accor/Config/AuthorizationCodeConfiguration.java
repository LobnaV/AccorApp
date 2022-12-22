package com.viggo.accor.Config;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Arrays;
import java.util.Base64;

@Component
public class AuthorizationCodeConfiguration {

	public String encodeCredentials(String username, String password) {
		String credentials = username + ":" + password;
		String encoded = new String(Base64.getEncoder().encode(
			credentials.getBytes()));
		return encoded;
	}

	public MultiValueMap<String, String> getBody(String authorizationCode) {
		MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
		formData.add("grant_type", "authorization_code");
		formData.add("scope", "offline");
		formData.add("code", authorizationCode);
		formData.add("redirect_uri", "https://61ef-2001-861-e386-b700-16c4-59a1-fca9-2f12.ngrok.io/auth/callback");
		return formData;
	}

	public HttpHeaders getHeader(String clientAuthentication) {
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
		httpHeaders.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		httpHeaders.add("Authorization", "Basic " + clientAuthentication);
		return httpHeaders;
	}
}
