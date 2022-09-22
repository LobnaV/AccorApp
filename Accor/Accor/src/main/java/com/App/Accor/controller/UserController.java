package com.App.Accor.controller;

import com.App.Accor.model.User;
import com.App.Accor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/User")
public class UserController {

	@Autowired
	UserService service;

	@GetMapping("/List")
	public List<User> userList() {
		return service.userList();
	}

	@PostMapping("/AddUser")
	public User add(@RequestBody User user) {
		return service.add(user);
	}

	@GetMapping(path = {"/{id}"})
	public Optional<User> userListId(@PathVariable("id") Long id) {
		return service.userListId(id);
	}

	@PutMapping
	public ResponseEntity<User> edit(@RequestBody User user) {
		return ResponseEntity.ok(service.edit(user));
	}

	@DeleteMapping(path = {"/delete/{id}"})
	public void delete(@PathVariable long id) {
		service.delete(id);
	}

}
