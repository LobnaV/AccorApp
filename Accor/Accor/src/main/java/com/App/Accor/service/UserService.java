package com.App.Accor.service;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.model.User;
import com.App.Accor.playload.CsvFormatDTO;
import com.App.Accor.repository.CompanyParameterRepository;
import com.App.Accor.repository.UserRepository;
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

	@Autowired
	private TradeshiftInterface tradeshiftInterface;

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

	public User add(User user) {
		return userRepository.save(user);

	}

	public User edit(User user) {
		User userSaved = userRepository.save(user);
		Optional<CompanyParameter> companyParameter = companyParameterRepository.findByUserGMUsername(userSaved.getUsername()) ;

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId("A9016601");
		csvFormatDTO.setHome("TRUE");//Valeur Primary branch test
		csvFormatDTO.setEmail("mohamed.semlali.00@gmail.com");
		csvFormatDTO.setFirstName("lobna");
		csvFormatDTO.setLastName("Semlali");
		csvFormatDTO.setState("ACTIVE");
		csvFormatDTO.setManager("");
		csvFormatDTO.setApprovalLimit("");
		csvFormatDTO.setSpendLimit("");
		csvFormatDTO.setUserType("Head of Department");//A modifier
		try {
		//	String branchCode = tradeshiftInterface.getPrimaryBranchUser(userSaved.getUsername());
		//	csvFormatDTO.setHome(branchCode.equals(userSaved.getPrimaryBranch()) ? "TRUE" : "FALSE");
			//A verifier avec Mohamed
			csvFormatDTO.setOwnedCostCenter(userSaved.getUsername().equals(companyParameter.get().getDispacherMail())? "" : "");
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
