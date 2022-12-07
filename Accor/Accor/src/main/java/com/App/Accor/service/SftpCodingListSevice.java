package com.App.Accor.service;

import com.App.Accor.Config.UploadGateway;
import com.App.Accor.playload.CodingListFormat;
import com.App.Accor.playload.CsvFormatDTO;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.List;

public class SftpCodingListSevice {

	private final String DELIMITER = ";";

	@Autowired
	private UploadGateway uploadGateway;

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
		File csvOutputFile = new File("Accortemplateuserssheet.csv");
		try (PrintWriter pw = new PrintWriter(csvOutputFile)) {
			pw.println(headerCsv());
			csvFormats.forEach(codingList -> pw.println(convertToCSV(codingList)));
		}

		uploadGateway.upload(csvOutputFile);

	}
}


