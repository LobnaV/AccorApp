package com.App.Accor.controller;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.service.CompanyParameterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/api/Parameter")
public class ParamController {

    @Autowired
    private CompanyParameterService service;

    @GetMapping("/List")
    public List<CompanyParameter> paramList(){
        return service.paramList();
    }

    @PostMapping("/AddParameter")
    public CompanyParameter addParam(@RequestBody CompanyParameter param){
        return service.addParam(param);
    }

    @GetMapping({"/{id}"})
    public Optional<CompanyParameter> paramId(@PathVariable("id") Long id){
        return service.paramId(id);
    }

    @PutMapping({"/editParameter/{id}"})
    public CompanyParameter editCompany (@RequestBody CompanyParameter param, @PathVariable("id")Long id){
        param.setId(id);
        return service.editParam(param);
    }

    @DeleteMapping({"/deleteParameter/{id}"})
    public void deleteCompany(@PathVariable Long id ){
        service.deleteParam(id);
    }

}
