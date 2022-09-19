package com.App.Accor.service;

import com.App.Accor.model.BranchTradeshift;
import com.App.Accor.model.BranchTradeshiftDetails;
import com.App.Accor.model.IdentifierTradeShift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class TradeshiftInterface {

	private final String url = "https://api-sandbox.tradeshift.com/tradeshift/rest/external";
	private final String token = "EWv/hdnqkwCbGQpZP8+5JG90IcdJhh+tkkW1KSlBX60iRAB6QoACHbA0r8tbhYsJMguUzGY2bT4S9ApHEi/sbtQ7w0v2avPIF8urVHLu6bfniXJ5SD/8lMs1AJ5HrWbNd9ynq8Q2gfSO/AZl/9V3MPsg9QBgtoZ7keMh0potbHXQjVh9kw44cnX+iZYkCDaWBxT/auaRrJg4WySnWi3kKW2b/z+aG38KOM8twTqVZtNh/fTQM32Z+ekBFR3Psvyo6QFs8ADK982kPM3WcmQV1rWBw0zm3B8wN7i34ORjTLc/6Dcgpgjrtdju4V7Xkr2cn51UmMR1FlG6PL4IWNzww1pAWBQRNLqvw7RA/fDAnDi5dmRQZoio9wxMtbgzLXB55Bs4N8kMEUiDp6KZBlAAWgIAAWCroqKZBg==";

	@Autowired
	private RestTemplate restTemplate;

	public List<String> getBranchsId(String email) throws Exception {
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

		ResponseEntity<BranchTradeshiftDetails> responseEntityBranchDetails = restTemplate.exchange(String.format("%s/account/%s", url, compagnyAccountId), HttpMethod.GET, entity, BranchTradeshiftDetails.class);

		BranchTradeshiftDetails branchTradeshiftDetails = Objects.requireNonNull(responseEntityBranchDetails.getBody());

		List<String> identifiers = branchTradeshiftDetails.getIdentifiers()
			.stream().map(IdentifierTradeShift::getValue).collect(Collectors.toList());

		if (CollectionUtils.isEmpty(identifiers)) {
			throw new Exception("Impossible de récupérer les informations de tradeshift de la compagnie : " + compagnyAccountId);
		}

		return identifiers;
	}
}
