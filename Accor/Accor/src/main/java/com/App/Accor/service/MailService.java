package com.App.Accor.service;

import com.App.Accor.model.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Locale;

/**
 * Service for sending emails.
 * <p>
 * We use the {@link Async} annotation to send emails asynchronously.
 */
@Slf4j
@Service
public class MailService {

	@Value("${application.mail.baseUrl}")
	private String basUrl;

	@Value("${spring.mail.username}")
	private String mailFrom;

	private static final String USER = "user";

	private static final String BASE_URL = "baseUrl";

	private final JavaMailSender javaMailSender;

	private final MessageSource messageSource;

	private final SpringTemplateEngine templateEngine;

	public MailService(JavaMailSender javaMailSender,
										 MessageSource messageSource, SpringTemplateEngine templateEngine) {

		this.javaMailSender = javaMailSender;
		this.messageSource = messageSource;
		this.templateEngine = templateEngine;
	}

	@Async
	public void sendEmail(String to, String subject, String content, boolean multipart, boolean isHtml) {
		log.debug("Send email[html '{}'] to '{}' with subject '{}' and content={}", isHtml, to, subject, content);

		// Prepare message using a Spring helper
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		try {
			MimeMessageHelper message = new MimeMessageHelper(mimeMessage, multipart, StandardCharsets.UTF_8.name());
			message.setTo(to);
			message.setFrom(mailFrom);
			message.setSubject(subject);
			message.setText(content, isHtml);
			javaMailSender.send(mimeMessage);
			log.debug("Sent email to User '{}'", to);
		} catch (Exception e) {
			if (log.isDebugEnabled()) {
				log.warn("Email could not be sent to user '{}'", to, e);
			} else {
				log.warn("Email could not be sent to user '{}': {}", to, e.getMessage());
			}
		}
	}

	@Async
	public void sendEmailFromTemplate(User user, String templateName, String titleKey) {
		Locale locale = Locale.FRENCH;
		Context context = new Context(locale);
		context.setVariable(USER, user);
		context.setVariable(BASE_URL, basUrl);
		String content = templateEngine.process(templateName, context);
		String subject = messageSource.getMessage(titleKey, null, locale);
		sendEmail(user.getUsername(), subject, content, false, true);

	}

	@Async
	public void sendPasswordResetMail(User user) {
		log.debug("Sending password reset email to '{}'", user.getUsername());
		sendEmailFromTemplate(user, "mail/passwordResetEmail", "email.reset.title");
	}
}
