package com.App.Accor.controller;

import com.App.Accor.model.Staff;
import com.App.Accor.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

	@Autowired
	private StaffService service;

	@PostMapping
	public ResponseEntity<Staff> createStaff(@Valid @RequestBody Staff Staff) throws Exception {
		if (Staff.getId() != null) {
			throw new Exception("A new staff cannot already have an ID");
		}
		Staff result = service.save(Staff);
		return ResponseEntity.created(new URI("/api/staff/" + result.getId())).body(result);
	}

	@PutMapping
	public ResponseEntity<Staff> updateStaff(@Valid @RequestBody Staff Staff) throws Exception {
		if (Staff.getId() == null) {
			throw new Exception("Invalid id");
		}
		Staff result = service.save(Staff);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Staff> getStaff(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}


	@GetMapping("/compagnie/{idCompagnie}")
	public ResponseEntity<List<Staff>> getAllStaffscompagnie(@PathVariable Long idCompagnie) {
		return ResponseEntity.ok().body(service.findByCompagnie(idCompagnie));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteStaff(@PathVariable Long id) throws Exception {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}
