package com.viggo.accor.controller;

import com.viggo.accor.model.CompanyParameter;
import com.viggo.accor.model.CostCenter;
import com.viggo.accor.model.Staff;
import com.viggo.accor.service.CostCenterService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
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

	@PostMapping("/cl")
	public ResponseEntity<byte[]> postSave(@RequestBody CostCenter costCenter) throws Exception {
		byte[] postSave = service.postSave(costCenter);
//		return ResponseEntity.ok(postSave);

		return ResponseEntity.status(HttpStatus.OK).header("Content-Disposition", "attachment;")
			.contentType(new MediaType("text", "csv"))
			.body(postSave);
	}

	@PreAuthorize("hasRole('ROLE_COMPANYADMIN')")
	@PostMapping
	public ResponseEntity<CostCenter> createCostCenter(@Valid @RequestBody CostCenter costCenter) throws Exception {
		if (costCenter.getId() != null){
			throw  new Exception("A new Cost center cannot aready have an ID");
		}
		CostCenter result = service.save(costCenter);
		return ResponseEntity.created(new URI("api/costCenter/" + result.getId())).body(result);
	}

	@PreAuthorize("hasAnyRole('ROLE_GM', 'ROLE_COMPANYADMIN')")
	@GetMapping({"/{id}"})
	public ResponseEntity<CostCenter> getCostCenter(@PathVariable Long id) {
		return ResponseEntity.ok((service.findById(id)));
	}

	@PreAuthorize("hasAnyRole('ROLE_GM', 'ROLE_COMPANYADMIN')")
	@PutMapping
	public ResponseEntity<CostCenter> updateCostCenter(@Valid @RequestBody CostCenter costCenter) throws Exception {
		if (costCenter.getId() == null){
			throw new Exception("invalid id");
		}
		CostCenter result = service.save(costCenter);
		return ResponseEntity.ok(result);
	}

	@PreAuthorize("hasAnyRole('ROLE_COMPANYADMIN')")
	@DeleteMapping({"/{id}"})
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}

	@PreAuthorize("hasAnyRole('ROLE_GM','ROLE_COMPANYADMIN')")
	@GetMapping("/costCenter/{idCompagnie}")
	public ResponseEntity<List<CostCenter>> getAllCostCentercompagnie(@PathVariable Long idCompagnie) {
		return ResponseEntity.ok().body(service.findByCompanyId(idCompagnie));
	}


}
