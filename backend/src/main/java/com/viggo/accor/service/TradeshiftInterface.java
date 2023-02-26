package com.viggo.accor.service;

import com.viggo.accor.model.BranchTradeshift;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Objects;

@Service
@Slf4j
public class TradeshiftInterface {

	private final String url = "https://api-sandbox.tradeshift.com/tradeshift/rest/external";

	@Autowired
	private RestTemplate restTemplate;

	public String getPrimaryBranchUser(String email, String accessToken) {
		try {
			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.setBearerAuth(accessToken);
			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

			HttpEntity<String> entity = new HttpEntity<>(null, headers);

			ResponseEntity<BranchTradeshift> responseEntityBranch = restTemplate.exchange(String.format("%s/account/users/byemail/%s", url, email), HttpMethod.GET, entity, BranchTradeshift.class);

			BranchTradeshift branchTradeshift = Objects.requireNonNull(responseEntityBranch.getBody());

			String compagnyAccountId = branchTradeshift.getOverridingCompagnyAccountId() != null ? branchTradeshift.getOverridingCompagnyAccountId() : branchTradeshift.getCompanyAccountId();

			HttpHeaders headers2 = new HttpHeaders();
			headers2.setBearerAuth(accessToken);
			headers2.setContentType(MediaType.TEXT_PLAIN);
			headers2.setAccept(Collections.singletonList(MediaType.TEXT_PLAIN));

			HttpEntity<String> entity2 = new HttpEntity<>(null, headers2);
			ResponseEntity<String> response = restTemplate.exchange(String.format("%s/companies/%s/properties/CustomerAssignedId", url, compagnyAccountId), HttpMethod.GET, entity2, String.class);

			String branchId = Objects.requireNonNull(response.getBody());
			return branchId;
		} catch (Exception e) {
			log.error("Error geting primary branch. The value TRUE will be put by default");
			return null;
		}
	}

}
