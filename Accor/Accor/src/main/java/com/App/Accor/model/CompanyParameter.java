package com.App.Accor.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CompanyParameter implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique=true)
    private String hotel_MegaCode;
		private String hotel_Name;
    private String perimeter;
    private String general_manager;
    private String portfolio;
    private String mm_gm;
    private String mmm_gm;



    public CompanyParameter(String hotel_MegaCode, String perimeter, String general_manager, Branch branch) {
        this.hotel_MegaCode = hotel_MegaCode;
        this.perimeter = perimeter;
        this.general_manager = general_manager;
        //this.branch = branch;
    }

}
