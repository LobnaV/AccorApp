package com.App.Accor.controller;

import com.App.Accor.dto.CreateUserDto;
import com.App.Accor.model.*;
import com.App.Accor.repository.BranchRepository;
import com.App.Accor.service.BranchService;
import com.App.Accor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*",maxAge = 3600)
@RestController
@RequestMapping("/api/Branch")
public class BranchController {

    @Autowired
    private BranchService service;

    @Autowired
    private BranchRepository branchRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/List")
    public List<Branch> branchList(){
        return service.branchList();
    }

    @PostMapping("/AddBranch")
    public Branch add(@RequestBody Branch branch){

        return service.add(branch);
    }

    @GetMapping({"/{id}"})
    public Optional<Branch> listId(@PathVariable("id") Long id){
        return service.listId(id);
    }

    @PutMapping({"/edit/{id}"})
    public Branch edit (@RequestBody Branch branch, @PathVariable("id")String id){
        branch.setBranch_Id(id);
        return service.edit(branch);
    }

    @DeleteMapping({"/delete/{id}"})
    public void delete(@PathVariable Long id ){
        service.deleteBranch(id);
    }




    //Test

    @PostMapping({"/Test"})
    public User test(@RequestBody CreateUserDto createUserDto){
      //  List<String> hotelMegaCodes = new ArrayList<>();
     //   Set<CostCenter> costCenters = new HashSet<>();
      //  hotelMegaCodes.add("accor1");
       // hotelMegaCodes.add("accor2");
        List<Branch> branchs = branchRepository.findBranchByCompany(createUserDto.getHotelMegaCodes());
        Set<Company> companies = new HashSet<>();
        Company company1 = new Company();
      /*  Company company2 = new Company();
        company1.setHotel_MegaCode("accor1");
        company2.setHotel_MegaCode("accor2");
        companies.add(company1);
        companies.add(company2);
        CostCenter costCenter = new CostCenter();
        costCenter.setMegaCode_CostCenter_ID("cc1");*/
       // CostCenter costCenter2 = new CostCenter();
        //costCenters.add(costCenter);
        User user = new User();
        user.setEmail("test@test.com");
        user.setFirstName("test");
        user.setType("gm");
        user.setCompanies(companies);

        for (Branch branch: branchs) {

            if(branch.getPerimeter() == EPerimeter.NE){

                user.setCostCenters(createUserDto.getCostCenters());

                // branch NE => ajout user avec CC obligatoire
            }

        }
        return userService.add(user);

    }
}

