package com.App.Accor;

import com.App.Accor.model.*;
import com.App.Accor.repository.BranchRepository;
import com.App.Accor.repository.CompanyRepository;
import com.App.Accor.repository.CostCenterRepository;
import com.App.Accor.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class AccorApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BranchRepository branchR;

	@Autowired
	private CompanyRepository companyR;
	@Autowired
	private CostCenterRepository ccR;


	public static void main(String[] args) {
		SpringApplication.run(AccorApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Set<Company> companies = new HashSet<>();
		Set<Company> companies2 = new HashSet<>();

		CostCenter costCenter = new CostCenter();

		costCenter.setMegaCode_CostCenter_ID("cc1");
		costCenter.setMegaCode_CostCenter_Label("testcc");
		ccR.save(costCenter);

		Company company = new Company();
		company.setHotel_MegaCode("accor1");
		company.setHotel_Name("accor1");
		companyR.save(company);
		companies.add(company);

		Company company2 = new Company();
		company2.setHotel_MegaCode("accor2");
		company2.setHotel_Name("accor2");
		companyR.save(company2);
		companies2.add(company2);


		Branch branch = new Branch();
		branch.setBranch_Id("branch1");
		branch.setPerimeter(EPerimeter.NE);
		branch.setCountry_Code("test");
		branch.setCompanies(companies);

		branchR.save(branch);

		Branch branch2 = new Branch();
		branch2.setBranch_Id("branch2");
		branch2.setPerimeter(EPerimeter.SE);
		branch2.setCountry_Code("test2");
		branch2.setCompanies(companies2);

		branchR.save(branch2);


/*
		User user = new User();
		user.setEmail("testt@gmail.com");
		user.setName("test5");
		user.setType("gm");
		user.setCompanies(companies);

		userRepository.save(user);*/

	}
}
