package com.viggo.accor.service;

import com.viggo.accor.config.UploadGateway;
import com.viggo.accor.playload.CodingListFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
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

	public void uploadFileToSftp(List<CodingListFormat> csvFormats) throws FileNotFoundException {
		File csvOutputFile = new File(pathTemp + "/CostCenterList.csv");
		try (PrintWriter pw = new PrintWriter(csvOutputFile)) {
			pw.println(headerCsv());
			csvFormats.forEach(codingListx -> pw.println(convertToCSV(codingListx)));
		}

//		uploadGateway.upload(csvOutputFile);

		if (csvOutputFile.exists()) {
			csvOutputFile.delete();
		}

	}
}


