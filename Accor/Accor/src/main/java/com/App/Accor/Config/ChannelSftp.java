package com.App.Accor.Config;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;

public class ChannelSftp {

	private String remoteHost = "HOST_NAME_HERE";
	private String username = "SANDBOX_ACCOR_INVEST";
	private String password = "Sandbox_Accor";

	private ChannelSftp setupJsch() throws JSchException {
		JSch jsch = new JSch();
		jsch.setKnownHosts("/Users/john/.ssh/known_hosts");
		Session jschSession = jsch.getSession(username, remoteHost);
		jschSession.setPassword(password);
		jschSession.connect();
		return (ChannelSftp) jschSession.openChannel("sftp");
	}
}
