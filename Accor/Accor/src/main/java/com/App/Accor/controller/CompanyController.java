package com.App.Accor.controller;

import com.App.Accor.model.Company;
import com.App.Accor.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/api/Company")
public class CompanyController {

    @Autowired
    private CompanyService service;

    @GetMapping("/ListCompany")
    public List<Company> companyList(){
        return service.companyList();
    }

    @PostMapping("/AddCompany")
    public Company add(@RequestBody Company company){
        return service.add(company);
    }

    @GetMapping({"/{id}"})
    public Optional<Company> listIdCompany(@PathVariable("id") String id){
        return service.companyListId(id);
    }

    @PutMapping({"/editCompany/{id}"})
    public Company editCompany (@RequestBody Company company, @PathVariable("id")String id){
        company.setHotel_MegaCode(id);
        return service.edit(company);
    }

    @DeleteMapping({"/deleteCompany/{id}"})
    public void delete(@PathVariable String id ){
        service.delete(id);
    }
}
