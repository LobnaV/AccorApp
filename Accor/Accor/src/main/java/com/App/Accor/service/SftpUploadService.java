package com.App.Accor.service;

import com.App.Accor.Config.UploadGateway;
import com.App.Accor.playload.CsvFormatDTO;
import com.App.Accor.repository.CompanyParameterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;

@Service
@Transactional
public class SftpUploadService {

	private final String DELIMITER = ";";

	@Autowired
	private UploadGateway uploadGateway;

	private String convertToCSV(CsvFormatDTO csvFormat) {
		return csvFormat.getBranchId() +
			DELIMITER +
			csvFormat.getHome() +
			DELIMITER +
			csvFormat.getEmail() +
			DELIMITER +
			csvFormat.getFirstName() +
			DELIMITER +
			csvFormat.getLastName() +
			DELIMITER +
			csvFormat.getState() +
			DELIMITER +
			csvFormat.getManager() +
			DELIMITER +
			csvFormat.getApprovalLimit() +
			DELIMITER +
			csvFormat.getSpendLimit() +
			DELIMITER +
			csvFormat.getOwnedCostCenter() +
			DELIMITER +
			csvFormat.getUserType() +
			DELIMITER;
	}

	private String headerCsv() {
		return "BRANCH_ID" +
			DELIMITER +
			"HOME" +
			DELIMITER +
			"EMAIL" +
			DELIMITER +
			"FIRST_NAME" +
			DELIMITER +
			"LAST_NAME" +
			DELIMITER +
			"STATE" +
			DELIMITER +
			"MANAGER" +
			DELIMITER +
			"APPROVAL LIMIT" +
			DELIMITER +
			"SPEND_LIMIT" +
			DELIMITER +
			"COST_CENTER_OWNER" +
			DELIMITER +
			"USER_TYPE";
	}

	public void uploadFileToSftp(CsvFormatDTO csvFormat) throws FileNotFoundException {
		File csvOutputFile = new File("Accortemplateuserssheet.csv");
		try (PrintWriter pw = new PrintWriter(csvOutputFile)) {
			pw.println(headerCsv());
			pw.println(convertToCSV(csvFormat));
		}

		uploadGateway.upload(csvOutputFile);

	/*	if (csvOutputFile.exists()) {
			csvOutputFile.delete();
		}*/
	}

}
