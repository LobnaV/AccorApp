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
	private final String token = "EWv/hdnqkwCbGQpZP8+5JG90IcdJhh+tkkW1KSlBX60iRAB6QoACMkSy+u/aWbPqZnFs34AIKwObLXX4MlOZMZ3U7YOerSXQfuL7b++BEuZXCJxC3+uD19Jo3oFWP42Waew5Pk9kW9l/6Q7FonuBUIHgOCBXLA/2RKxpCllweeUyi56noEWZAuXk0LUOXu5JdYAnJ7SlhWbIs6DIYeVWMA3/wT+uP7JBWHADubvWkyz0XDChmXTP2zPwUqWiMRig3+Vrj1W2F+hI3XSaEwsqVqSKjr+d4HkB29K/3zscN+zUw1mJq3KIENkeZ3NrnCfI2R6WB60839t5TB6dxsbzjFoKlY3ajJTiFqhXc6fWwWdE+CEEDie+sC7H/VyDnAc1F8L9/myPikjgwdqaBlAAWgIAAWCIvdqaBg==";

	@Autowired
	private RestTemplate restTemplate;

	public String getPrimaryBranchUser(String email) throws Exception {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setBearerAuth(token);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

		HttpEntity<String> entity = new HttpEntity<>(null, headers);

		ResponseEntity<BranchTradeshift> responseEntityBranch = restTemplate.exchange(String.format("%s/account/users/byemail/%s", url, email), HttpMethod.GET, entity, BranchTradeshift.class);

		BranchTradeshift branchTradeshift = Objects.requireNonNull(responseEntityBranch.getBody());

		String compagnyAccountId = branchTradeshift.getOverridingCompagnyAccountId() != null ? branchTradeshift.getOverridingCompagnyAccountId() : branchTradeshift.getCompanyAccountId();

		if (compagnyAccountId == null) {
			throw new Exception("Impossible de récupérer les informations de tradeshift de l'utilisateur : " + email);
		}

		HttpHeaders headers2 = new HttpHeaders();
		headers2.setBearerAuth(token);
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
