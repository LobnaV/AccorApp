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
		private String branchID;
		private String branchName;
    @Column(unique=true)
    private String hotel_MegaCode;
		private String hotel_Name;
		private String general_manager;
		private String lastName_gm;
		private String firstName_gm;
		private String email_m_gm;
		private String lastName_m_gm;
		private String firstName_m_gm;
   // private String perimeter;
		private String roleParam;




    public CompanyParameter(String hotel_MegaCode, String perimeter, String general_manager, Branch branch) {
        this.hotel_MegaCode = hotel_MegaCode;
        //this.perimeter = perimeter;
        //this.general_manager = general_manager;
        //this.branch = branch;
    }

}
