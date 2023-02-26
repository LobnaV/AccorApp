package com.viggo.accor.controller;

import com.viggo.accor.model.User;
import com.viggo.accor.service.UserService;
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
	public ResponseEntity<List<User>> userList() throws Exception{
		return ResponseEntity.ok(service.userList()) ;
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> userListId(@PathVariable Long id) {
		return ResponseEntity.ok(service.findById(id));
	}

	@PutMapping("/name")
	public ResponseEntity<User> editName(@RequestBody User user, @RequestHeader("Ts_Access_Token") String accessToken) throws Exception {
		if (user.getId() == null) {
			throw new Exception("Invalid id");
		}
		return ResponseEntity.ok(service.updateName(user, accessToken));
	}

	@DeleteMapping("/delete/{id}")
	public void delete(@PathVariable long id) {
		service.delete(id);
	}

}
