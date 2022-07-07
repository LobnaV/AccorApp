package com.App.Accor.service.serviceImpl;

import com.App.Accor.model.Company;
import com.App.Accor.model.CostCenter;
import com.App.Accor.repository.CostCenterRepository;
import com.App.Accor.service.CostCenterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CostCenterServiceImpl implements CostCenterService {

    @Autowired
    private CostCenterRepository costCenterR;

    @Override
    public List<CostCenter> costCenterList() {
        return costCenterR.findAll();
    }

    @Override
    public Optional<CostCenter> costCenterListId(String id) {
        return costCenterR.findById(id);
    }

    @Override
    public CostCenter add(CostCenter costCenter) {

        return costCenterR.save(costCenter);
    }

    @Override
    public CostCenter edit(CostCenter costCenter) {
        return costCenterR.save(costCenter);
    }

    @Override
    public void delete(final String id) {
        Optional<CostCenter> costCenter = costCenterR.findById(id);
        if (costCenter != null){
            costCenterR.delete(costCenter.get());
        }
    }
}
