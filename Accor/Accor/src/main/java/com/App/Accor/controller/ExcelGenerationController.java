package com.App.Accor.controller;

import com.App.Accor.playload.CsvFormatDTO;
import com.App.Accor.service.ExcelGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/excel")
public class ExcelGenerationController {

	@Autowired
	private ExcelGenerationService excelGenerationService;

	@PostMapping("/param/{idCompagnie}")
	public ResponseEntity<byte[]> generateSituationExcel(@RequestBody CsvFormatDTO csvFormat, @PathVariable Long idCompagnie) throws IOException {

		return ResponseEntity.status(HttpStatus.OK).header("Content-Disposition", "attachment;")
			.contentType(MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
			.body(excelGenerationService.generateSituationFactureExcel(csvFormat, idCompagnie));
	}


}
