package com.App.Accor.controller;

import com.App.Accor.model.KeyAndPasswordVM;
import com.App.Accor.model.User;
import com.App.Accor.service.MailService;
import com.App.Accor.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/reset-password")
public class ForgotPasswordController {

	@Autowired
	private UserService userService;

	@Autowired
	private MailService mailService;

	private static boolean checkPasswordLength(String password) {
		return !StringUtils.isEmpty(password) &&
			password.length() >= 4 &&
			password.length() <= 100;
	}

	@PostMapping(path = "/init")
	public void requestPasswordReset(@RequestBody String mail) throws Exception {
		mailService.sendPasswordResetMail(
			userService.requestPasswordReset(mail)
				.orElseThrow(Exception::new)
		);
	}

	@PostMapping(path = "/finish")
	public void finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) throws Exception {
		if (!checkPasswordLength(keyAndPassword.getNewPassword())) {
			throw new Exception("Password invalid");
		}
		Optional<User> user =
			userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());

		if (!user.isPresent()) {
			throw new Exception("No user was found for this reset key");
		}
	}
}
