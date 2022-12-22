package com.viggo.accor.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.expression.common.LiteralExpression;
import org.springframework.integration.annotation.ServiceActivator;
import org.springframework.integration.sftp.outbound.SftpMessageHandler;
import org.springframework.integration.sftp.session.DefaultSftpSessionFactory;
import org.springframework.messaging.MessageHandler;

@Configuration
public class ChannelSftp {

	private final String sftpHost = "esb1.tradeshift.com";

	private final int sftpPort = 22;

	private final String sftpUser = "SANDBOX_ACCOR_INVEST";

	@Value("classpath:sftp/Tradeshift-Accor_Invest_Sandbox-PrivateKey.ppk")
	private Resource sftpPrivateKey;

	private final String sftpPrivateKeyPassphrase = "Sandbox_Accor";

	private final String sftpPasword = "Accor_Invest_Sandbox";

	private final String sftpRemoteDirectory = "/Inbound/User";

	@Bean
	public DefaultSftpSessionFactory sftpSessionFactory() {
		DefaultSftpSessionFactory factory = new DefaultSftpSessionFactory(true);
		factory.setHost(sftpHost);
		factory.setPort(sftpPort);
		factory.setUser(sftpUser);
		if (sftpPrivateKey != null) {
			factory.setPrivateKey(sftpPrivateKey);
			factory.setPrivateKeyPassphrase(sftpPrivateKeyPassphrase);
		} else {
			factory.setPassword(sftpPasword);
		}
		factory.setAllowUnknownKeys(true);
		return factory;
	}

	@Bean
	@ServiceActivator(inputChannel = "uploadfile")
	public MessageHandler handler() {
		SftpMessageHandler messageHandler = new SftpMessageHandler(sftpSessionFactory());
		messageHandler.setRemoteDirectoryExpression(new LiteralExpression(sftpRemoteDirectory));
		messageHandler.setFileNameGenerator(message -> "Accortemplateuserssheet.csv");
		messageHandler.setUseTemporaryFileName(false);
		return messageHandler;
	}
}
