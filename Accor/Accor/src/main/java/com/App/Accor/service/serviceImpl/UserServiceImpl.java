package com.App.Accor.service.serviceImpl;

import com.App.Accor.model.Company;
import com.App.Accor.model.EPerimeter;
import com.App.Accor.model.User;
import com.App.Accor.repository.BranchRepository;
import com.App.Accor.repository.CompanyRepository;
import com.App.Accor.repository.UserRepository;
import com.App.Accor.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private BranchRepository branchRepository;


    @Override
    public List<User> userList() {
       return userRepository.findAll();
    }

    @Override
    public Optional<User> userListId(Long id) {
        return userRepository.findById(id);
    }

	@Override
	public Optional<User> dispId(Long id) {
		return userRepository.findById(id);
	}

	@Override
    public User add(User user) {
 /*       Set<Company> companyList = user.getCompanies();
        for (var company:companyList) {
            if (company.getBranch().getPerimeter() == EPerimeter.NE && !user.getCostCenters().isEmpty()){
                return userRepository.save(user);

            }else if (company.getBranch().getPerimeter() == EPerimeter.SE && user.getCostCenters().isEmpty())
                return userRepository.save(user);

        }return null;*/
        return userRepository.save(user);

    }

    @Override
    public User edit(User user) {
        return userRepository.save(user);
    }

    @Override
    public void delete(final Long id) {
        Optional<User>user = userRepository.findById(id);
        if (user != null){
            userRepository.delete(user.get());
        }
    }
}
