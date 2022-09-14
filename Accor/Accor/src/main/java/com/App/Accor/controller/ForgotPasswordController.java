package com.App.Accor.controller;

import com.App.Accor.model.User;
import com.App.Accor.model.UserNotFoundException;
import com.App.Accor.playload.Utility;
import com.App.Accor.service.serviceImpl.UserServiceImpl;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;

@Controller
public class ForgotPasswordController {

	@Autowired
	private UserServiceImpl userService;

	@Autowired
	private JavaMailSender mailSender;

	@GetMapping("/forgot_password")
	public String showForgotPasswordForm(Model model){
		model.addAttribute("pageTitle", "Forgot Password");
		return "forgot_password_form";
	}

	@PostMapping("/forgot_password")
	public String processForgotPasswordForm(HttpServletRequest request, Model model){
		String username = request.getParameter("username");
		String token = RandomString.make(45);


		try{
			userService.updateResetPasswordToken(token, username);
			String resetPasswordLink = Utility.getSiteURL(request) + "/reset_password?token=" + token;
			sendEmail(username, resetPasswordLink);

			model.addAttribute("message", "We have sent a reset password link to your email. Please check");

		}catch (UserNotFoundException exception){
			model.addAttribute("error", exception.getMessage());
		} catch (UnsupportedEncodingException | MessagingException e) {
			model.addAttribute("error","Error while sending email.");
		}

		model.addAttribute("pageTitle", "ForgotPassword");
		return "forgot_password";
	}

	private void sendEmail(String username, String resetPasswordLink) throws UnsupportedEncodingException, MessagingException {
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);
		//quel mail mettre ??
		helper.setFrom("lobna.kharrat@viggo.com", "accor support");
		helper.setTo(username);

		String subject = "Here's the link to reset your password";
		String content = "<p> Hello,</p>"
						+ "<p>You have requested to reset your password.</p>"
						+ "<p>Click the link below to change your password;</p>"
						+ "<p><b><a href=\""+ resetPasswordLink + "\">Change my password</a><b></p>"
						+ "<p>Ignore this email if you do remember your password, or you have not mad the request.</p>";

		helper.setSubject(subject);
		helper.setText(content, true);

		mailSender.send(message);

	}

	@GetMapping("/reset_password")
	public String showResetPasswordForm(@Param(value = "token")String token,Model model){
		User user = userService.getByResetPasswordToken(token);
		if(user == null){
			model.addAttribute("title", "Reset your password");
			model.addAttribute("message", "Invalid Token");
			return "message";

		}
			//userService.updatePassword(user, password);

			model.addAttribute("token", token);
			model.addAttribute("message", "You have successfully changed your password.");

		return "reset_password_form";
	}

	@PostMapping("/reset_password")
	public String processResetPassword(HttpServletRequest request, Model model) {
		String token = request.getParameter("token");
		String password = request.getParameter(("password"));

		User user = userService.getByResetPasswordToken(token);

		if (user == null) {
			model.addAttribute("title", "Reset your password");
			model.addAttribute("message", "Invalid Token");
			return "message";
		} else {
			userService.updatePassword(user, password);
			model.addAttribute("message", "You have successfully changed your password.");


		}
		return "message";

	}
}
