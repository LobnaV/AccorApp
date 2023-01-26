package com.viggo.accor.service;

import com.viggo.accor.model.Category;
import com.viggo.accor.repository.CategorieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategorieService {

	@Autowired
	private CategorieRepository categorieRepository;

	@Transactional(readOnly = true)
	public List<Category> findAll() {
		return categorieRepository.findAll();
	}
}
