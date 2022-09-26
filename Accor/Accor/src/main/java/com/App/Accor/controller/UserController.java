package com.App.Accor.controller;

import com.App.Accor.model.User;
import com.App.Accor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/User")
public class UserController {

	@Autowired
	UserService service;

	@GetMapping("/List")
	public List<User> userList() {
		return service.userList();
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> userListId(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@PutMapping
	public ResponseEntity<User> edit(@RequestBody User user) throws Exception {
		if (user.getId() == null) {
			throw new Exception("Invalid id");
		}
		return ResponseEntity.ok(service.edit(user));
	}

	@PutMapping("/name")
	public ResponseEntity<User> editName(@RequestBody User user) throws Exception {
		if (user.getId() == null) {
			throw new Exception("Invalid id");
		}
		return ResponseEntity.ok(service.updateName(user));
	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable long id) {
		service.delete(id);
	}

}
