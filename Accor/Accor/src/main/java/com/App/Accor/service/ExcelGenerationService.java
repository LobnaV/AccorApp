package com.App.Accor.service;

import com.App.Accor.playload.CsvFormatDTO;
import com.App.Accor.repository.CompanyParameterRepository;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
@Transactional
public class ExcelGenerationService {

	@Value("classpath:templates/excel/template_excel.xlsx")
	private Resource resource;

	@Autowired
	private CompanyParameterRepository parameterRepository;


	public byte[] generateSituationFactureExcel(CsvFormatDTO csvFormat, Long idCompagnie) throws IOException {
		InputStream file = resource.getInputStream();
		XSSFWorkbook workbook = new XSSFWorkbook(file);
		XSSFSheet sheet = workbook.getSheetAt(0);
		//Update the value of cell
		int startRow = 2;
		XSSFRow row1 = sheet.createRow(startRow);
		XSSFCell cell;
		XSSFCellStyle cellStyle = workbook.createCellStyle();
		XSSFFont hSSFFont = workbook.createFont();
		hSSFFont.setFontName(HSSFFont.FONT_ARIAL);
		hSSFFont.setFontHeightInPoints((short) 9);
		cellStyle.setFont(hSSFFont);
		cellStyle.setBorderBottom(BorderStyle.THIN);
		cellStyle.setBorderTop(BorderStyle.THIN);
		cellStyle.setBorderRight(BorderStyle.THIN);
		cellStyle.setBorderLeft(BorderStyle.THIN);
		cellStyle.setAlignment(HorizontalAlignment.CENTER);
		cell = row1.createCell(0);
		cell.setCellValue(csvFormat.getBranchId());
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(1);
		cell.setCellValue(csvFormat.getHome());
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(2);
		cell.setCellValue(csvFormat.getEmail());
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(3);
		cell.setCellValue(csvFormat.getFirstName());
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(4);
		cell.setCellValue(csvFormat.getLastName());
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(5);
		cell.setCellValue(csvFormat.getState());
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(6);
		cell.setCellValue(csvFormat.getManager());
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(7);
		cell.setCellValue(csvFormat.getApprovalLimit());
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(8);
		cell.setCellValue(csvFormat.getSpendLimit());
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(9);
		cell.setCellValue(csvFormat.getOwnedCostCenter());
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(10);
		cell.setCellValue(csvFormat.getUserType());
		cell.setCellStyle(cellStyle);

		file.close();

		ByteArrayOutputStream docOutStream = new ByteArrayOutputStream();
		workbook.write(docOutStream);
		workbook.close();
		docOutStream.close();

		parameterRepository.updateDispacher(idCompagnie, csvFormat.getEmail());

		return sendFtpServer(docOutStream.toByteArray());
	}


	public byte[] sendFtpServer(byte[] file) {
		FTPClient client = new FTPClient();
		String filename = String.format("Accortemplateuserssheet_%s.xlsx",
			LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd_MM_yyyy_HH_mm")));
		try (InputStream is = new ByteArrayInputStream(file)) {
			client.connect("esb1.tradeshift.com");
			boolean login = client.login("SANDBOX_ACCOR_INVEST", "Sandbox_Accor");
			if (login) {
				System.out.println("Login success...");

				// Store file to server
				client.storeFile(filename, is);
				client.logout();
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				client.disconnect();
				return file;
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return file;
	}

}
