package com.App.Accor.Config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.expression.common.LiteralExpression;
import org.springframework.integration.annotation.*;
import org.springframework.integration.core.MessageSource;
import org.springframework.integration.file.FileNameGenerator;
import org.springframework.integration.file.filters.AcceptOnceFileListFilter;
import org.springframework.integration.file.remote.session.CachingSessionFactory;
import org.springframework.integration.file.remote.session.SessionFactory;
import org.springframework.integration.sftp.filters.SftpSimplePatternFileListFilter;
import org.springframework.integration.sftp.inbound.SftpInboundFileSynchronizer;
import org.springframework.integration.sftp.inbound.SftpInboundFileSynchronizingMessageSource;
import org.springframework.integration.sftp.outbound.SftpMessageHandler;
import org.springframework.integration.sftp.session.DefaultSftpSessionFactory;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageHandler;
import com.jcraft.jsch.ChannelSftp.LsEntry;
import org.springframework.messaging.handler.annotation.Header;

import java.io.File;
import java.io.InputStream;

@Configuration
public class ChannelSftp {

	private String sftpHost = "esb1.tradeshift.com";

	private int sftpPort = 22;

	private String sftpUser = "SANDBOX_ACCOR_INVEST";

	@Value("classpath:sftp/Tradeshift-Accor_Invest_Sandbox-PrivateKey.ppk")
	private Resource sftpPrivateKey;

	private String sftpPrivateKeyPassphrase = "Sandbox_Accor";

	private String sftpPasword = "Accor_Invest_Sandbox";

	private String sftpRemoteDirectory = "/Inbound/User";

	@Bean
	public SessionFactory<LsEntry> sftpSessionFactory() {
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
		return new CachingSessionFactory<>(factory);
	}

//	@Bean
//	@ServiceActivator(inputChannel = "tosftpChannel")
//	public MessageHandler handler(){
//		SftpMessageHandler messageHandler = new SftpMessageHandler(sftpSessionFactory());
//		messageHandler.setRemoteDirectoryExpression(new LiteralExpression(sftpRemoteDirectory));
//		messageHandler.setFileNameGenerator(message -> {
//			System.out.println(message.getHeaders().get("fileName"));
//			System.out.println(message.getPayload());
//			return message.getHeaders().get("fileName").toString();
//		});
//		return messageHandler;
//	}

	@Bean
	public SftpInboundFileSynchronizer sftpInboundFileSynchronizer(){
		SftpInboundFileSynchronizer fileSynchronizer = new SftpInboundFileSynchronizer(sftpSessionFactory());
		fileSynchronizer.setDeleteRemoteFiles(false);
		fileSynchronizer.setRemoteDirectory(sftpRemoteDirectory);
		System.out.println("M a gaya");
		fileSynchronizer.setFilter(new SftpSimplePatternFileListFilter("*.txt"));
		return fileSynchronizer;
	}

	@Bean
	//@InboundChannelAdapter(channel = "sftpChannel", poller = @Poller(fixedDelay = "5000"))//,autoStartup = "false")
	@InboundChannelAdapter(channel = "tosftpChannel")//,autoStartup = "false")
	public MessageSource<File> sftpMessageSource(){
		System.out.println("Into sftpMessageSource()");
		SftpInboundFileSynchronizingMessageSource source = new SftpInboundFileSynchronizingMessageSource(sftpInboundFileSynchronizer());
		source.setLocalDirectory(new File("target/foo"));
		source.setAutoCreateLocalDirectory(true);
		System.out.println("Flow");
		source.setLocalFilter(new AcceptOnceFileListFilter<>());
		source.setMaxFetchSize(1);
		//sftpInboundFileSynchronizer();
		return source;
	}

//	@Bean
//	public SftpInboundFileSynchronizer sftpInboundFileSynchronizer() {
//		SftpInboundFileSynchronizer fileSynchronizer = new SftpInboundFileSynchronizer(sftpSessionFactory());
//		fileSynchronizer.setDeleteRemoteFiles(false);
//		fileSynchronizer.setRemoteDirectory(sftpRemoteDirectory);
//		fileSynchronizer.setFilter(new SftpSimplePatternFileListFilter("*.xml"));
//		return fileSynchronizer;
//	}
//
//	@Bean
//	@InboundChannelAdapter(channel = "toSftpChannel", poller = @Poller(fixedDelay = "5000"))
//	public MessageSource<File> sftpMessageSource() {
//		SftpInboundFileSynchronizingMessageSource source =
//			new SftpInboundFileSynchronizingMessageSource(sftpInboundFileSynchronizer());
//		source.setLocalDirectory(new File("ftp-inbound"));
//		source.setAutoCreateLocalDirectory(true);
//		source.setLocalFilter(new AcceptOnceFileListFilter<>());
//		return source;
//	}

//	@Bean
//	@ServiceActivator(inputChannel = "toSftpChannel")
//	public MessageHandler handler() {
//		SftpMessageHandler handler = new SftpMessageHandler(sftpSessionFactory());
//		handler.setRemoteDirectoryExpression(new LiteralExpression(sftpRemoteDirectory));
//		handler.setFileNameGenerator(message -> {
//			if (message.getPayload() instanceof File) {
//				return ((File) message.getPayload()).getName();
//			} else {
//				throw new IllegalArgumentException("File expected as payload.");
//			}
//		});
//		return handler;
//	}

	@MessagingGateway
	public interface UploadGateway {

		@Gateway(requestChannel = "tosftpChannel")
		public void sendToSftp(@Header("fileName") String fileName, InputStream file);

//		@Gateway(requestChannel = "toSftpChannel")
//		void upload(File file);

	}
}
