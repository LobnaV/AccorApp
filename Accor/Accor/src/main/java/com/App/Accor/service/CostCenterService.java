package com.App.Accor.service;

import com.App.Accor.model.CostCenter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface CostCenterService {
    List<CostCenter> costCenterList();
    Optional<CostCenter> costCenterListId(String id);
    CostCenter add(CostCenter costCenter);
    CostCenter edit(CostCenter costCenter);
    void delete(String id);
}
