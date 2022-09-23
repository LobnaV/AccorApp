package com.App.Accor.controller;

import com.App.Accor.model.CostCenter;
import com.App.Accor.service.CostCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/CostCenter")
public class CostCenterController {

	@Autowired
	private CostCenterService service;

	@GetMapping("/List")
	public List<CostCenter> costCentersList() {
		return service.costCenterList();
	}

	@PostMapping("/AddCostCenter")
	public CostCenter add(@RequestBody CostCenter costCenter) {
		return service.add(costCenter);
	}

	@GetMapping({"/{id}"})
	public Optional<CostCenter> costCenterListId(@PathVariable("id") String id) {
		return service.costCenterListId(id);
	}

	@PutMapping({"/editCostCenter/{id}"})
	public CostCenter edit(@RequestBody CostCenter costCenter, @PathVariable("id") String id) {
		costCenter.setMegaCode_CostCenter_ID(id);
		return service.edit(costCenter);
	}

	@DeleteMapping({"/deleteCostCenter/{id}"})
	public void delete(@PathVariable String id) {
		service.delete(id);
	}


}
