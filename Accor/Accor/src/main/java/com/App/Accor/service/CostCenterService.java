package com.App.Accor.service;

import com.App.Accor.model.CostCenter;
import com.App.Accor.repository.CostCenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CostCenterService {

	@Autowired
	private CostCenterRepository costCenterR;

	public List<CostCenter> costCenterList() {
		return costCenterR.findAll();
	}

	public Optional<CostCenter> costCenterListId(String id) {
		return costCenterR.findById(id);
	}

	public CostCenter add(CostCenter costCenter) {

		return costCenterR.save(costCenter);
	}

	public CostCenter edit(CostCenter costCenter) {
		return costCenterR.save(costCenter);
	}

	public void delete(final String id) {
		Optional<CostCenter> costCenter = costCenterR.findById(id);
		costCenter.ifPresent(center -> costCenterR.delete(center));
	}
}
