package com.viggo.accor.service;

import com.viggo.accor.model.*;
import com.viggo.accor.playload.CsvFormatDTO;
import com.viggo.accor.repository.CompanyParameterRepository;
import com.viggo.accor.repository.RoleRepository;
import com.viggo.accor.repository.UserRepository;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

import static com.viggo.accor.utils.ConstantsUtils.getApprovalLimit;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

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
			.orElseThrow(() -> new UsernameNotFoundException("Impossible de trouver l'utilisateur associé"));
	}

	public User saveDefaultUserGM(User user) {
		String defaultPass = generateDefaultPassword(user.getUsername());
		String encryptedPassword = passwordEncoder.encode(defaultPass);
		user.setPassword(encryptedPassword);
		Role roleGm = roleRepository.findByName(ERole.ROLE_GM)
			.orElseThrow(() -> new UsernameNotFoundException("Impossible de trouver l'utilisateur associé"));
		user.setRoles(Collections.singleton(roleGm));
		return userRepository.save(user);
	}

	public static String generateDefaultPassword(String login) {
		return Base64.getEncoder().encodeToString(login.getBytes());
	}

	public User edit(User user, String accessToken) throws Exception {
		User userSaved = userRepository.save(user);
		CompanyParameter companyParameter = companyParameterRepository.findByUserGMUsername(userSaved.getUsername())
			.orElseThrow(() -> new Exception("Impossible de trouver l'hotel associé à l'utilisateur : " + userSaved.getUsername()));

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId(companyParameter.getBranch().getCode());
		csvFormatDTO.setEmail(userSaved.getUsername());
		csvFormatDTO.setFirstName(userSaved.getFirstName());
		csvFormatDTO.setLastName(user.getLastName());
		csvFormatDTO.setState("ACTIVE");
		csvFormatDTO.setManager(companyParameter.getGeneralManagerN1Mail());
		csvFormatDTO.setUserType("General Manager");// a modifier apres l'ajout des roles
		if (companyParameter.getBranch().getPerimeter().equals(EPerimeter.Southern_Europe)) {
			if (companyParameter.getDispacherMail().equals(userSaved.getUsername())) {
				csvFormatDTO.setOwnedCostCenter(companyParameter.getMegaCode());
				csvFormatDTO.setApprovalLimit("0");
				csvFormatDTO.setSpendLimit("0");
			} else {
				csvFormatDTO.setOwnedCostCenter("");
				csvFormatDTO.setApprovalLimit(getApprovalLimit(companyParameter.getCategory()));
				csvFormatDTO.setSpendLimit(csvFormatDTO.getApprovalLimit());
			}
		} else {
			csvFormatDTO.setApprovalLimit("");
			csvFormatDTO.setSpendLimit("");
			csvFormatDTO.setOwnedCostCenter("");
		}
		try {
			String branchCode = tradeshiftInterface.getPrimaryBranchUser(userSaved.getUsername(), accessToken);
			csvFormatDTO.setHome(branchCode == null || branchCode.equals(companyParameter.getBranch().getCode()) ? "TRUE" : "FALSE");
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

	public User updateName(User user, String accessToken) throws Exception {
		User userSaved = findById(user.getId());
		userSaved.setFirstName(user.getFirstName());
		userSaved.setLastName(user.getLastName());

		return edit(userSaved, accessToken);
	}

	public User findByUsername(String email) {
		return userRepository.findByUsername(email)
			.orElseThrow(() -> new UsernameNotFoundException("Impossible de trouver l'utilisateur associé"));
	}
}
