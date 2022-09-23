package com.App.Accor.service;

import com.App.Accor.model.BranchTradeshift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Objects;

@Service
public class TradeshiftInterface {

	private final String url = "https://api-sandbox.tradeshift.com/tradeshift/rest/external";
	private final String token = "EWv/hdnqkwCbGQpZP8+5JG90IcdJhh+tkkW1KSlBX60iRAB6QoACalUa+3fJPi7TE13YqUzeOoFAg2ZGF8Y7hzuBJiS8kjwkRqTvNdWlMg7GGrYO1GJmh73gCWtPOIfg3XzpzHinav8Qt3P6LxY9W+zWsPpZeWt9bgu/6xWeSDyjQPQbeTunSGZeWKDsyIwFXPmAJcv/k7QHPAuQ989rOcpJRZ1iAu+wIc2JUkqKjgyCGVdFgqXOqIYnxOClLSY0mk99f5WkhjFPr1gIcdhbL4gZrmDxHCltx1MRqX7tN7Y+O5ISMlbgaoaG+yp4URpK2EaOYhxnzUTF/d2HCjttfKH3eU/tRrFrR00weLu3Z2Ep90k4WLjEpNdAs1hh/5TAhqeUBikFEUiHz6KZBlAAWgIAAWCvyqKZBg==";

	@Autowired
	private RestTemplate restTemplate;

	@Autowired
	private BranchService branchService;

	public String getPrimaryBranchUser(String email) throws Exception {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		headers.setBearerAuth(token);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

		HttpEntity<String> entity = new HttpEntity<>(null, headers);

		ResponseEntity<BranchTradeshift> responseEntityBranch = restTemplate.exchange(String.format("%s/account/users/byemail/%s", url, email), HttpMethod.GET, entity, BranchTradeshift.class);

		BranchTradeshift branchTradeshift = Objects.requireNonNull(responseEntityBranch.getBody());

		String compagnyAccountId = branchTradeshift.getOverridingCompagnyAccountId() != null ? branchTradeshift.getOverridingCompagnyAccountId() : branchTradeshift.getCompanyAccountId();

		if (compagnyAccountId == null) {
			throw new Exception("Impossible de récupérer les informations de tradeshift de l'utilisateur : " + email);
		}

		return branchService.findByUuid(compagnyAccountId).getCode();
	}
}
