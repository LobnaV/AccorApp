package com.App.Accor.service;

import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class ExcelGenerationService {

	@Value("classpath:templates/excel/template_excel.xlsx")
	private Resource resource;


	public byte[] generateSituationFactureExcel() throws IOException {
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
		cell.setCellValue("A9024903");
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(1);
		cell.setCellValue("TRUE");
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(2);
		cell.setCellValue("H3162-AM@ACCOR.COM");
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(3);
		cell.setCellValue("Glen");
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(4);
		cell.setCellValue("Anderson");
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(5);
		cell.setCellValue("LOCKED");
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(6);
		cell.setCellValue("H3162-GM@ACCOR.COM");
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(7);
		cell.setCellValue("1000");
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(8);
		cell.setCellValue("");
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(9);
		cell.setCellValue("");
		cell.setCellStyle(cellStyle);
		cell = row1.createCell(10);
		cell.setCellValue("Head of Department");
		cell.setCellStyle(cellStyle);

		file.close();

		ByteArrayOutputStream docOutStream = new ByteArrayOutputStream();
		workbook.write(docOutStream);
		workbook.close();
		docOutStream.close();

		return docOutStream.toByteArray();
	}

}
