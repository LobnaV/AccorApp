package com.viggo.accor.service;

import com.viggo.accor.Config.AuthorizationCodeTokenService;
import com.viggo.accor.Config.OAuth2Token;
import com.viggo.accor.model.BranchTradeshift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.OAuth2RestOperations;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Objects;

@Service
public class TradeshiftInterface {

	private final String url = "https://api-sandbox.tradeshift.com/tradeshift/rest/external";
//	private final String token = "PmS4pRk4KYb8mQRNccQ81PQjspKCvDRFUu0eB6dPebH547VQ2nLQ0gUkGqzysa61SKB6vQ8JAtkSPhlciQjFDQ8Mu5k4mSLukBGZWvDrEK5VXaFzVyTyPZFjGH3maPctYtW+uzOs0aGHPJp7AG5zPpJldaP1i7sYPdfa1JYJbIVRCFA5Cbw9W9U4fPSgeiULQYeUmVtPG5c5RttnXqIyRuIY40ifpt+aBlAAWgIAAWDHod+aBg==";

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private AuthorizationCodeTokenService authorizationCodeTokenService;

	public String getPrimaryBranchUser(String email) throws Exception {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
//		String code = authorizationCodeTokenService.getAuthorizationEndpoint();
		OAuth2Token token = authorizationCodeTokenService.getToken(authorizationCodeTokenService.getAuthorizationEndpoint());
//		headers.setBearerAuth(token);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

		HttpEntity<String> entity = new HttpEntity<>(null, headers);

		ResponseEntity<BranchTradeshift> responseEntityBranch = restTemplate.exchange(String.format("%s/account/users/byemail/%s", url, email), HttpMethod.GET, entity, BranchTradeshift.class);

		BranchTradeshift branchTradeshift = Objects.requireNonNull(responseEntityBranch.getBody());

		String compagnyAccountId = branchTradeshift.getOverridingCompagnyAccountId() != null ? branchTradeshift.getOverridingCompagnyAccountId() : branchTradeshift.getCompanyAccountId();

		if (compagnyAccountId == null) {
			throw new Exception("Impossible de récupérer les informations de tradeshift de l'utilisateur : " + email);
		}

		HttpHeaders headers2 = new HttpHeaders();
//		headers2.setBearerAuth(token);
		headers2.setContentType(MediaType.TEXT_PLAIN);
		headers2.setAccept(Collections.singletonList(MediaType.TEXT_PLAIN));

		HttpEntity<String> entity2 = new HttpEntity<>(null, headers2);
		ResponseEntity<String> response = restTemplate.exchange(String.format("%s/companies/%s/properties/CustomerAssignedId", url, compagnyAccountId), HttpMethod.GET, entity2, String.class);

		String branchId = Objects.requireNonNull(response.getBody());

		if (branchId == null) {
			throw new Exception("Impossible de récupérer les informations de tradeshift de l'utilisateur : " + email);
		}

		return branchId;
	}

}
