package com.App.Accor.service;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.playload.CsvFormatDTO;
import com.App.Accor.repository.CompanyParameterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CompanyParamService {

	@Autowired
	private CompanyParameterRepository parameterRepository;

	@Autowired
	private TradeshiftInterface tradeshiftInterface;

	@Autowired
	private SftpUploadService sftpUploadService;

	public CompanyParameter findByUserGM() throws Exception {
		UserDetails userDetails =
			(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return parameterRepository.findByUserGMUsername(userDetails.getUsername()).orElseThrow(() -> new Exception("Impossible de trouver l'hotel associé"));
	}

	public CompanyParameter save(CompanyParameter companyParameter) {
		return parameterRepository.save(companyParameter);
	}

	@Transactional(readOnly = true)
	public CompanyParameter findById(Long id) {
		return parameterRepository.findById(id)
			.orElseThrow(() -> new UsernameNotFoundException("Staff Not Found with id : " + id));
	}

	public void delete(Long id) {
		parameterRepository.deleteById(id);
	}

	public CompanyParameter updateDispacher(Long id, String email) {
		parameterRepository.updateDispacher(id, email);
		CompanyParameter companyParameter = findById(id);

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		// TO DO : remplir l'objet csvFormatDTO avec les bonnes valeurs
		try {
//			String branchCode = tradeshiftInterface.getPrimaryBranchUser(email);
//			csvFormatDTO.setHome(branchCode.equals(companyParameter.getBranch().getCode()) ? "TRUE" : "FALSE");
//			sftpUploadService.uploadFileToSftp(csvFormatDTO);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return companyParameter;
	}
}
