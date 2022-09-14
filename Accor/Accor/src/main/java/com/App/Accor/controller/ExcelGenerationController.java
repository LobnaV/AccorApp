package com.App.Accor.controller;

import com.App.Accor.service.ExcelGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ExcelGenerationController {

	@Autowired
	private ExcelGenerationService excelGenerationService;

	@GetMapping("/excel")
	public ResponseEntity<byte[]> generateSituationExcel() throws IOException {

		return ResponseEntity.status(HttpStatus.OK).header("Content-Disposition", "attachment;")
			.contentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			.body(excelGenerationService.generateSituationFactureExcel());
	}


}
