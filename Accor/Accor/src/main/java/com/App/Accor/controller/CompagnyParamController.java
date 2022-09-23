package com.App.Accor.controller;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.playload.CsvFormatDTO;
import com.App.Accor.service.CompanyParamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

	@GetMapping("/List")
	public ResponseEntity<List<CompanyParameter>> findByCompagnie() throws Exception {
		return ResponseEntity.ok(Collections.singletonList(service.findByUserGM()));
	}

	@PostMapping
	public ResponseEntity<CompanyParameter> createCompanyParameter(@Valid @RequestBody CompanyParameter CompanyParameter) throws Exception {
		if (CompanyParameter.getId() != null) {
			throw new Exception("A new compagny parameter cannot already have an ID");
		}
		CompanyParameter result = service.save(CompanyParameter);
		return ResponseEntity.created(new URI("/api/parameter/" + result.getId())).body(result);
	}

	@PutMapping
	public ResponseEntity<CompanyParameter> updateCompanyParameter(@Valid @RequestBody CompanyParameter CompanyParameter) throws Exception {
		if (CompanyParameter.getId() == null) {
			throw new Exception("Invalid id");
		}
		CompanyParameter result = service.save(CompanyParameter);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/{id}")
	public ResponseEntity<CompanyParameter> getCompanyParameter(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteCompanyParameter(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("/{id}/dispacher")
	public ResponseEntity<CompanyParameter> updateDispatcher(@RequestParam String email, @PathVariable Long id) throws Exception {

		return ResponseEntity.ok(service.updateDispacher(id, email));
	}

}
