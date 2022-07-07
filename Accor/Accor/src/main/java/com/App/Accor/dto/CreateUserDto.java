package com.App.Accor.dto;

import com.App.Accor.model.Company;
import com.App.Accor.model.CostCenter;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
public class CreateUserDto {
    List<String> hotelMegaCodes ;
    Set<CostCenter> costCenters ;
    List<Company> companies = new ArrayList<>();

}
