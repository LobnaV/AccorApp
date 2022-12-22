package com.viggo.accor.Config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AuthorizationCodeTokenService {
	@Autowired
	private AuthorizationCodeConfiguration configuration;

	@Autowired
	private RestTemplate rest;

	public String getAuthorizationEndpoint() {
		String endpoint = "https://api-sandbox.tradeshift.com/tradeshift/auth/login";
		Map<String, String> authParameters = new HashMap<>();
		authParameters.put("client_id", "ACCORHOSPITALITYNLNV.AccorAppUser");
		authParameters.put("response_type", "code");
		authParameters.put("redirect_uri", getEncodedUrl("https://61ef-2001-861-e386-b700-16c4-59a1-fca9-2f12.ngrok.io/auth/callback"));
		authParameters.put("scope", getEncodedUrl("offline"));
		return buildUrl(endpoint, authParameters);
	}

	private String buildUrl(String endpoint, Map<String, String> parameters) {
		List<String> paramList = new ArrayList<>(parameters.size());
		parameters.forEach((name, value) -> {
			paramList.add(name + "=" + value);
		});
		return endpoint + "?" + paramList.stream().reduce((a, b) -> a + "&" + b).get();
	}

	private String getEncodedUrl(String url) {
		return URLEncoder.encode(url, StandardCharsets.UTF_8);
	}

	public OAuth2Token getToken(String authorizationCode) {
		String authBase64 = configuration.encodeCredentials(
			"ACCORHOSPITALITYNLNV.AccorAppUser", "c6f21019-9d78-44a2-b666-080f922c861d");
		RequestEntity<MultiValueMap<String, String>> requestEntity = new RequestEntity<>(
			configuration.getBody(authorizationCode),
			configuration.getHeader(authBase64), HttpMethod.POST,
			URI.create("https://api-sandbox.tradeshift.com/tradeshift/auth/token"));
		ResponseEntity<OAuth2Token> responseEntity = rest.exchange(requestEntity, OAuth2Token.class);
		if (responseEntity.getStatusCode().is2xxSuccessful())
			return responseEntity.getBody();
		throw new RuntimeException("error trying to retrieve access token");
	}
}
