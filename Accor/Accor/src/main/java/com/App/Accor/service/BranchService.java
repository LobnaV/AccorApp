package com.App.Accor.service;

import com.App.Accor.model.Branch;
import com.App.Accor.model.CompanyParameter;
import com.App.Accor.model.Staff;
import com.App.Accor.repository.BranchRepository;
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

	public List<Branch> branchList() {
		return branchR.findAll();
	}

	public Optional<Branch> listId(Long id) {
		return branchR.findById(id);
	}

	public Branch findByUuid(String uuid) {
		return branchR.findByUuid(uuid)
			.orElseThrow(() -> new UsernameNotFoundException("Branch Not Found with uuid : " + uuid));
	}

	@Transactional(readOnly = true)
	public Branch findById(Long id){
		return branchR.findById(id)
			.orElseThrow();

	}

/*	@Transactional(readOnly = true)
	public CompanyParameter findById(Long id) {
		return parameterRepository.findById(id)
			.orElseThrow(() -> new UsernameNotFoundException("Staff Not Found with id : " + id));
	}*/


	public Branch findByUserMGM() throws Exception {
		UserDetails userDetails =
			(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return branchR.findByUserMGMUsername(userDetails.getUsername()).orElseThrow(() -> new Exception("Impossible de trouver la branche associée"));
	}

	public Branch add(Branch branch) {
		return branchR.save(branch);
	}

	public Branch edit(Branch branch) {
		return branchR.save(branch);
	}

	public void deleteBranch(final Long id) {
		Optional<Branch> branch = branchR.findById(id);
		branch.ifPresent(value -> branchR.delete(value));

	}


}
