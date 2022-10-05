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
	private final String token = "ETfENXYJiTijGQdNeZJqQvt7If9gciDLThazKepPDTSa/n5aQoACjheSlHfzHRk0xUuS4LVetWfK8xpOxRaJAXuh1TFz/1BhGjhE1mMOLT7pSJmQQyHj3RDrnkK711kRogJhqUvNED4e+FHWYHy9iAX9kvCmoJx7KuS1Y+vLLQI4sWnHkHDbUIT6agp6xIkHaNAeKsK02/GGdsI/RMxloZs01qqwJGSyQ7Jv4c3JEwb2NkqHj+CGk6zjmVojFhVuyvRAAbCx+OY2vfdIPCvdoHd4B1aHRr1dDzVNDAZGLw0BtHcxXYSgDr/tDixsLtE5WHDSnzbqfdWgL4z2dNyvr0WpaqgNB9+YmDNHCXwdqsPJKEMDG+DvSMuV96kFHzTknEeczHhGY0jkjfaZBlAAWgIAAWCMifaZBg==";
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
