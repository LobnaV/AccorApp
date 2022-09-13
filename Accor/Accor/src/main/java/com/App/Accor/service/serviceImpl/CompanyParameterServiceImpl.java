package com.App.Accor.service.serviceImpl;

import com.App.Accor.model.CompanyParameter;
import com.App.Accor.repository.CompanyParameterRepository;
import com.App.Accor.service.CompanyParameterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CompanyParameterServiceImpl implements CompanyParameterService {

    @Autowired
    private CompanyParameterRepository parameterRepository;

    @Override
    public CompanyParameter paramList(String username) throws Exception {
        return parameterRepository.findByUserGMUsername(username).orElseThrow(() -> new Exception("Impossible de trouver l'hotel associé"));
    }

    @Override
    public Optional<CompanyParameter> paramId(Long id) {
        return parameterRepository.findById(id);
    }

    @Override
    public CompanyParameter addParam(CompanyParameter param) {
        return parameterRepository.save(param);
    }

    @Override
    public CompanyParameter editParam(CompanyParameter param) {
        return parameterRepository.save(param);
    }

    @Override
    public void deleteParam(final Long id) {
        Optional<CompanyParameter>param = parameterRepository.findById(id);
            if (param != null){
                parameterRepository.delete(param.get());
            }
    }
}
