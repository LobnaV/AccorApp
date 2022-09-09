package com.App.Accor.controller;

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

}

