package com.viggo.accor.service;

import com.viggo.accor.config.UploadGateway;
import com.viggo.accor.playload.CodingListFormat;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;


@Service
@Transactional
public class SftpCodingListSevice {

	private final String DELIMITER = ";";

	@Autowired
	private UploadGateway uploadGateway;

	@Value("${application.temp.sftp}")
	private String pathTemp;

	private String convertToCSV(CodingListFormat codingList) {
		return codingList.getMegaCodeCostCenter_ID() +
			DELIMITER +
			codingList.getMegaCodeCostCenter_Label() +
			DELIMITER +
			codingList.getApprover() +
			DELIMITER;
	}

	private String headerCsv() {
		return "MegaCodeCostCenter ID" +
			DELIMITER +
			"MegaCodeCostCenter Label" +
			DELIMITER +
			"Approver" +
			DELIMITER;
	}

	public byte[] uploadFileToSftp(List<CodingListFormat> csvFormats, String branchCode) throws IOException {
		String fineName = String.format("/IP-19_MegaCodeCostCenter_%s_%s", branchCode, LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
		File csvOutputFile = new File(pathTemp + fineName);
		try (PrintWriter pw = new PrintWriter(csvOutputFile)) {
			pw.println(headerCsv());
			csvFormats.forEach(codingListx -> pw.println(convertToCSV(codingListx)));
		}

		uploadGateway.upload(csvOutputFile);

		byte[] output = FileUtils.readFileToByteArray(csvOutputFile);

		if (csvOutputFile.exists()) {
			csvOutputFile.delete();
		}

		return output;

	}
}


