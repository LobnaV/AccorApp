package com.viggo.accor.service;

import com.viggo.accor.model.CompanyParameter;
import com.viggo.accor.model.User;
import com.viggo.accor.playload.CsvFormatDTO;
import com.viggo.accor.repository.CompanyParameterRepository;
import com.viggo.accor.repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CompanyParameterRepository companyParameterRepository;

//	@Autowired
//	private TradeshiftInterface tradeshiftInterface;

	@Autowired
	private SftpUploadService sftpUploadService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public List<User> userList() {
		return userRepository.findAll();
	}

	public User findById(Long id) {
		return userRepository.findById(id)
			.orElseThrow(() -> new UsernameNotFoundException("Staff Not Found with id : " + id));
	}

	public User edit(User user) {
		User userSaved = userRepository.save(user);
		Optional<CompanyParameter> companyParameter = companyParameterRepository.findByUserGMUsername(userSaved.getUsername()) ;

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId(companyParameter.get().getBranch().getCode());
		csvFormatDTO.setEmail(userSaved.getUsername());
		csvFormatDTO.setFirstName(userSaved.getFirstName());
		csvFormatDTO.setLastName(user.getLastName());
		csvFormatDTO.setState("ACTIVE");
		csvFormatDTO.setManager(companyParameter.get().getUserGM().getUsername());
		csvFormatDTO.setApprovalLimit("10000");
		csvFormatDTO.setSpendLimit("10000");
		csvFormatDTO.setUserType("General Manager");// a modifier apres l'ajout des roles
		try {
//			String branchCode = tradeshiftInterface.getPrimaryBranchUser(userSaved.getUsername());
//			csvFormatDTO.setHome(branchCode.equals(userSaved.getPrimaryBranch()) ? "TRUE" : "FALSE");
			csvFormatDTO.setHome("TRUE");
			csvFormatDTO.setOwnedCostCenter(userSaved.getUsername().equals(companyParameter.get().getDispacherMail())? "" : "");
			//csvFormatDTO.setUserType();
			sftpUploadService.uploadFileToSftp(csvFormatDTO);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return userSaved;
	}



	public void delete(final Long id) {
		Optional<User> user = userRepository.findById(id);
		user.ifPresent(value -> userRepository.delete(value));
	}

	public Optional<User> completePasswordReset(String newPassword, String key) {
		return userRepository.findOneByResetKey(key)
			.map(user -> {
				user.setPassword(passwordEncoder.encode(newPassword));
				user.setResetKey(null);
				user.setResetDate(null);
				return user;
			});
	}

	public Optional<User> requestPasswordReset(String mail) {
		return userRepository.findByUsername(mail)
			.map(user -> {
				user.setResetKey(generateResetKey());
				user.setResetDate(Instant.now());
				return user;
			});
	}

	public static String generateResetKey() {
		return RandomStringUtils.randomNumeric(20);
	}

	public User updateName(User user) {
		User userSaved = findById(user.getId());
		userSaved.setFirstName(user.getFirstName());
		userSaved.setLastName(user.getLastName());

		return edit(userSaved);
	}
}
