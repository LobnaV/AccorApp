package com.App.Accor.controller;

import com.App.Accor.model.*;
import com.App.Accor.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Branch")
public class BranchController {

	@Autowired
	private BranchService service;


	@GetMapping("/List")
	public ResponseEntity<List<Branch>> branchList() throws Exception {
		return ResponseEntity.ok(Collections.singletonList(service.findByUserMGM()));
	}

	@GetMapping("/allBranches")
	public ResponseEntity<List<Branch>> allBranches() throws Exception {
		return ResponseEntity.ok(service.findAll());
	}


	@PostMapping
	public ResponseEntity<Branch> createBranch(@Valid @RequestBody Branch Branch) throws Exception {
		if(Branch.getId() != null){
			throw new Exception("A new user cannot already have an ID");
		}
		Branch result = service.save(Branch);
		return ResponseEntity.created(new URI("/api/branch" + result.getId())).body(result);
	}

	@PutMapping
	public ResponseEntity<Branch> updateBranch(@Valid @RequestBody Branch branch) throws Exception {
		if (branch.getId() == null) {
			throw new Exception("Invalid id");
		}
		Branch result = service.save(branch);
		return ResponseEntity.ok(result);
	}

/*
	@GetMapping("/AllBranchesSE")
	public ResponseEntity<List<List<Branch>>> allBranchesSE() throws Exception {
		return ResponseEntity.ok(Collections.singletonList(service.branchList(EPerimeter.SE)));
	}

	@GetMapping("/AllBranchesNE")
	public ResponseEntity<List<List<Branch>>> allBranchesNE() throws Exception {
		return ResponseEntity.ok(Collections.singletonList(service.branchList(EPerimeter.NE)));
	}*/

	@GetMapping({"/{id}"})
	public ResponseEntity<Branch> getBranch (@PathVariable Long id){
		return ResponseEntity.ok(service.findById(id));
	}

	/*@PutMapping({"/edit/{id}"})
	public Branch edit(@RequestBody Branch branch, @PathVariable("id") Long id) {
		branch.setId(id);
		return service.edit(branch);
	}*/

	@DeleteMapping({"/delete/{id}"})
	public void delete(@PathVariable Long id) {
		service.deleteBranch(id);
	}
}

