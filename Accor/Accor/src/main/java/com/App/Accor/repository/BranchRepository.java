package com.App.Accor.repository;

import com.App.Accor.model.Branch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@Repository
@CrossOrigin("*")
@Transactional
public interface BranchRepository extends JpaRepository<Branch, Long> {

    @Query(
            value = "SELECT * FROM company c " +
                    "INNER JOIN branch_companies bc " +
                    "ON c.hotel_mega_code = bc.companies_hotel_mega_code " +
                    "INNER JOIN branch b " +
                    "ON b.branch_id = bc.branch_branch_id " +
                    "WHERE hotel_mega_code IN :hotelMegaCodes",
            nativeQuery = true)
    List<Branch> findBranchByCompany(@Param("hotelMegaCodes") List<String> hotelMegaCodes);
}
