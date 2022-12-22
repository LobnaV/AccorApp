package com.viggo.accor.config;


import org.springframework.integration.annotation.Gateway;
import org.springframework.integration.annotation.MessagingGateway;

import java.io.File;

@MessagingGateway
public interface UploadGateway {

	@Gateway(requestChannel = "uploadfile")
	void upload(File file);

}
