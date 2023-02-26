package com.viggo.accor.service;

import com.viggo.accor.model.*;
import com.viggo.accor.playload.CsvFormatDTO;
import com.viggo.accor.repository.BranchRepository;
import com.viggo.accor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BranchService {

	@Autowired
	private BranchRepository branchR;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private SftpUploadService sftpUploadService;

	public List<Branch> branchList() {
		return branchR.findAll();
	}

	public List<Branch> findAll() {
		return branchR.findAll();
	}

	public Optional<Branch> listId(Long id) {
		return branchR.findById(id);
	}

	@Transactional(readOnly = true)
	public Branch findById(Long id){
		return branchR.findById(id)
			.orElseThrow();
	}


	public List<Branch> findByUserMGM() throws Exception {
		UserDetails userDetails =
			(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return branchR.findByUserMGMUsername(userDetails.getUsername());
	}

	public Branch save(Branch branch) throws Exception {
		 User user = branch.getUserMGM();
		if (user.getId() != null) {
			User oldUser = userRepository.findById(user.getId())
				.orElseThrow(() -> new Exception("Impossible de trouver l'utilisateur associé"));
			oldUser.setFirstName(user.getFirstName());
			oldUser.setLastName(user.getLastName());
			oldUser.setUsername(user.getUsername());
			user = oldUser;
		};

		branch.setUserMGM(userRepository.save(user));
		Branch branchSaved = branchR.save(branch);

		CsvFormatDTO csvFormatDTO = new CsvFormatDTO();
		csvFormatDTO.setBranchId(branchSaved.getCode());
		csvFormatDTO.setHome("TRUE");
		csvFormatDTO.setEmail(branchSaved.getUserMGM().getUsername());
		csvFormatDTO.setFirstName(branchSaved.getUserMGM().getFirstName());
		csvFormatDTO.setLastName(branchSaved.getUserMGM().getLastName());
		csvFormatDTO.setState("ACTIVE");
		csvFormatDTO.setManager(branchSaved.getUserMGM().getUsername());
		csvFormatDTO.setApprovalLimit("");
		csvFormatDTO.setSpendLimit("");
		csvFormatDTO.setOwnedCostCenter("");
		csvFormatDTO.setUserType("General Manager");
		try {
			sftpUploadService.uploadFileToSftp(csvFormatDTO);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return branchSaved;
	}

	public void deleteBranch(final Long id) {
		Optional<Branch> branch = branchR.findById(id);
		branch.ifPresent(value -> branchR.delete(value));
	}


}
