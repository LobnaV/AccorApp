package com.viggo.accor.controller;

import com.viggo.accor.model.Category;
import com.viggo.accor.service.CategorieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategorieController {

	@Autowired
	private CategorieService service;

	@GetMapping
	public ResponseEntity<List<Category>> getCategorie() {
		return ResponseEntity.ok(service.findAll());
	}

}
