package com.App.Accor.service;

import com.App.Accor.Config.UploadGateway;
import com.App.Accor.playload.CsvFormatDTO;
import com.App.Accor.repository.CompanyParameterRepository;
import org.apache.commons.io.FileUtils;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Service
@Transactional
public class ExcelGenerationService {

	@Value("classpath:templates/excel/template_excel.xlsx")
	private Resource resource;

	@Autowired
	private CompanyParameterRepository parameterRepository;

	@Autowired
	private TradeshiftInterface tradeshiftInterface;

	@Autowired
	private UploadGateway uploadGateway;


	public byte[] generateSituationFactureExcel(CsvFormatDTO csvFormat, Long idCompagnie) throws Exception {
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

//		cell = row1.createCell(0);
//		cell.setCellValue(csvFormat.getBranchId());
//		cell.setCellStyle(cellStyle);
//		cell = row1.createCell(1);
//		cell.setCellValue(csvFormat.getHome());
//		cell.setCellStyle(cellStyle);
//		cell = row1.createCell(2);
//		cell.setCellValue(csvFormat.getEmail());
//		cell.setCellStyle(cellStyle);
//		cell = row1.createCell(3);
//		cell.setCellValue(csvFormat.getFirstName());
//		cell.setCellStyle(cellStyle);
//		cell = row1.createCell(4);
//		cell.setCellValue(csvFormat.getLastName());
//		cell.setCellStyle(cellStyle);
//		cell = row1.createCell(5);
//		cell.setCellValue(csvFormat.getState());
//		cell.setCellStyle(cellStyle);
//		cell = row1.createCell(6);
//		cell.setCellValue(csvFormat.getManager());
//		cell.setCellStyle(cellStyle);
//		cell = row1.createCell(7);
//		cell.setCellValue(csvFormat.getApprovalLimit());
//		cell.setCellStyle(cellStyle);
//		cell = row1.createCell(8);
//		cell.setCellValue(csvFormat.getSpendLimit());
//		cell.setCellStyle(cellStyle);
//		cell = row1.createCell(9);
//		cell.setCellValue(csvFormat.getOwnedCostCenter());
//		cell.setCellStyle(cellStyle);
//		cell = row1.createCell(10);
//		cell.setCellValue(csvFormat.getUserType());
//		cell.setCellStyle(cellStyle);

		file.close();

		ByteArrayOutputStream docOutStream = new ByteArrayOutputStream();
		workbook.write(docOutStream);
		workbook.close();
		docOutStream.close();

		parameterRepository.updateDispacher(idCompagnie, csvFormat.getEmail());

//		File targetFile = new File("D:\\telechargement\\Accortemplateuserssheet.xlsx");

//		try {
//			uploadGateway.upload(targetFile);
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//
//		if (targetFile.exists())

//		Files.readFileToByteArray(docOutStream, targetFile);

		tradeshiftInterface.getBranchsId("mohamed.semlali.00@gmail.com");

		File targetFile = new File("Accortemplateuserssheet.xlsx");
		FileUtils.writeByteArrayToFile(targetFile, docOutStream.toByteArray());

//		uploadGateway.upload(targetFile);

		targetFile.delete();

		return null;
	}

}
