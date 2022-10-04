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
	private final String token = "ETfENXYJiTijGQdNeZJqQvt7If9gciDLThazKepPDTSa/n5aQoACVm5Y/qGjdJpIyO+ic7FX1JonsJOZ+NablwKAOhHV4wIUh01rqxZizD+d1EGVYAbL4qu4W1GEut6bZ1PhWoRVDxl4EG2lNaGwhPdyXmrtadFXy32NudUhu+sjzXs2m8ARfWOK/Su+LC6j5gH/JAk4xbKVU9v3/xK9YpZLNGzbrSIl53L0R7Q/wa9Q+q1UwPjK234ylUxf7IpRtNy6d17RaTnk8AJvEuXp4Vnni+lwQprED21l9uFKGmwj1RIMQbwVro8gCLV0lqw0pmkvpd+GZF/EuVgoUKTJXfrQFVEKFF0tKH+FCHGoZM4uJEeZqYgdFa637IP0CsQsVKpmxRC7ZEjn/++ZBlAAWgIAAWCP+++ZBg==";
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
