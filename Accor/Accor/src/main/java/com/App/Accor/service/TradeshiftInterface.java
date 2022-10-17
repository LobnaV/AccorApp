package com.App.Accor.service;

import com.App.Accor.model.BranchTradeshift;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.Objects;

@Service
public class TradeshiftInterface {

	private final String url = "https://api-sandbox.tradeshift.com/tradeshift/rest/external";
	private final String token = "EWv/hdnqkwCbGQpZP8+5JG90IcdJhh+tkkW1KSlBX60iRAB6QoACbva8adtoC5N6NcIB45YBomGVkcv9RRK0tOo9oZC/Lk9x51wmn6O+wvPz70WQ8M6PakvJowrQYsciOyrkNIEqXsjaTeJleKhGCuFPXIOua8Qct+ASMnPGNV7tOXuD+3/9chASePbMaTJLq21iLcQnz3GFn5FdCXa9TJDxW/fP104IRu9xMVRFfOyaby5H2UQSUOXE3+jSsHVdXdwKtCPRaYfIhvSbW1vW5fnhySKqScBpC3tWOw4ACwieJ8eC9fkg1sxJyejPa3ZJrWbUnftInZ7dSUcDHZ9liXZ7KqyDBH17c3Z723X4/Yqjw9As1Nhk7NT4M1DrSRBWpAUG2r3030jd5LWaBlAAWgIAAWCF4LWaBg==";

	@Autowired
	private RestTemplate restTemplate;

	public String getPrimaryBranchUser(String email) throws Exception {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setBearerAuth(token);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

		HttpEntity<String> entity = new HttpEntity<>(null, headers);



		try {

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
		} catch (final HttpClientErrorException httpClientErrorException) {
			throw new Exception(httpClientErrorException);
		} catch (HttpServerErrorException httpServerErrorException) {
			throw new Exception(httpServerErrorException);
		} catch (Exception exception) {
			throw new Exception(exception);
		}
	}
}
