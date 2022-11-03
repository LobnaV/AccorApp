package com.App.Accor.service;

import com.App.Accor.model.Branch;
import com.App.Accor.model.CompanyParameter;
import com.App.Accor.model.EPerimeter;
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

	public List<Branch> branchList(EPerimeter perimeter) {
		//return branchR.findAll();
		return branchR.findByPerimeter(perimeter);
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
/*
	public Branch findByPerimeter(EPerimeter perimeter){
		return branchR.findByPerimeter(perimeter)
			.orElseThrow();
	}*/

	public Branch findByUserMGM() throws Exception {
		UserDetails userDetails =
			(UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return branchR.findByUserMGMUsername(userDetails.getUsername()).orElseThrow(() -> new Exception("Impossible de trouver la branche associée"));
	}

	public Branch save(Branch branch) {
		Branch branchSaved = branchR.save(branch);
		return branchSaved;
	}

	public void deleteBranch(final Long id) {
		Optional<Branch> branch = branchR.findById(id);
		branch.ifPresent(value -> branchR.delete(value));
	}


}
