package com.viggo.accor.repository;

import com.viggo.accor.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategorieRepository extends JpaRepository<Category, Long> {
}
