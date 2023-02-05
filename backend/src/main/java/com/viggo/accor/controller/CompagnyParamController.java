package com.viggo.accor.controller;

import com.viggo.accor.model.CompanyParameter;
import com.viggo.accor.service.CompanyParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/parameter")
public class CompagnyParamController {

	@Autowired
	private CompanyParamService service;

	@PreAuthorize("hasRole('ROLE_GM')")
	@GetMapping("/List")
	public ResponseEntity<List<CompanyParameter>> findByCompagnie() throws Exception {
		return ResponseEntity.ok(Collections.singletonList(service.findByUserGM()));
	}

	@PreAuthorize("hasRole('ROLE_COMPANYADMIN')")
	@GetMapping("/branch/{idBranch}")
	public ResponseEntity<List<CompanyParameter>> getAllCompaniesbranch(@PathVariable Long idBranch) {
		return ResponseEntity.ok().body(service.findByBranch(idBranch));
	}

	@PreAuthorize("hasRole('ROLE_COMPANYADMIN')")
	@PostMapping
	public ResponseEntity<CompanyParameter> createCompanyParameter(@Valid @RequestBody CompanyParameter CompanyParameter, @RequestHeader("Ts_Access_Token") String accessToken) throws Exception {
		if (CompanyParameter.getId() != null) {
			throw new Exception("A new compagny parameter cannot already have an ID");
		}
		CompanyParameter result = service.save(CompanyParameter, accessToken);
		return ResponseEntity.created(new URI("/api/parameter/" + result.getId())).body(result);
	}

	@PreAuthorize("hasRole('ROLE_COMPANYADMIN')")
	@PutMapping
	public ResponseEntity<CompanyParameter> updateCompanyParameter(@Valid @RequestBody CompanyParameter CompanyParameter, @RequestHeader("Ts_Access_Token") String accessToken) throws Exception {
		if (CompanyParameter.getId() == null) {
			throw new Exception("Invalid id");
		}
		CompanyParameter result = service.save(CompanyParameter, accessToken);
		return ResponseEntity.ok(result);
	}

	@PreAuthorize("hasAnyRole('ROLE_COMPANYADMIN', 'ROLE_GM')")
	@GetMapping("/{id}")
	public ResponseEntity<CompanyParameter> getCompanyParameter(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@PreAuthorize("hasRole('ROLE_COMPANYADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCompanyParameter(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	@PreAuthorize("hasRole('ROLE_GM')")
	@GetMapping("/{id}/dispacher")
	public ResponseEntity<CompanyParameter> updateDispatcher(@RequestParam String email, @PathVariable Long id, @RequestParam boolean isStaff, @RequestHeader("Ts_Access_Token") String accessToken) throws Exception {

		return ResponseEntity.ok(service.updateDispacher(id, email, isStaff, accessToken));
	}

}
