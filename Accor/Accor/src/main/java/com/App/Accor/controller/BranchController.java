package com.App.Accor.controller;

import com.App.Accor.model.Branch;
import com.App.Accor.service.BranchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/Branch")
public class BranchController {

	@Autowired
	private BranchService service;

	@GetMapping("/List")
	public List<Branch> branchList() {
		return service.branchList();
	}

	@PostMapping("/AddBranch")
	public Branch add(@RequestBody Branch branch) {
		return service.add(branch);
	}

	@GetMapping({"/{id}"})
	public Optional<Branch> listId(@PathVariable("id") Long id) {
		return service.listId(id);
	}

	@PutMapping({"/edit/{id}"})
	public Branch edit(@RequestBody Branch branch, @PathVariable("id") Long id) {
		branch.setId(id);
		return service.edit(branch);
	}

	@DeleteMapping({"/delete/{id}"})
	public void delete(@PathVariable Long id) {
		service.deleteBranch(id);
	}
}

