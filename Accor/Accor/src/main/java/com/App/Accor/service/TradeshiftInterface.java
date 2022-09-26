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
	private final String token = "EWv/hdnqkwCbGQpZP8+5JG90IcdJhh+tkkW1KSlBX60iRAB6QoACBJS7dZHf0aH/GXqpeQI3AzquvmGr4wL6hWU7fg83/MicHakb3zwnPJgvITEs49oaMsgUc4EeVKpYgE59CSCpFBu0io/JhRHGzVykx3o561YcFfOb4MFSjxKKvCegOAebjhf2lMv0Q/oM0+PQF6ZDIAWrxg+QjbmqZcNk8zaHf9t4WlKNAEISfb50tgTKJsEXuFlGK+XHc0JHPRx1iN6cwHpsW89aYPtXObMnoVz15IzZmGqLbxbF5NzadZod8IppoadbxathzejJkgKtnIYsW3Mp44qfW2W0beCfE4wt10R+SXlaF5lUtjEk92qnBe/5Wp13/jIcSN7JgC9AkT0hKkjAzsaZBlAAWgIAAWDoycaZBg==";

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
