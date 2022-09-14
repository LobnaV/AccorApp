package com.App.Accor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Branch implements Serializable{
    @Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private long id;
    private String branch_Id;
    private String branch_Name;
    private String country_Code;
    @NotNull
    @Enumerated(EnumType.STRING)
    private EPerimeter perimeter;



    public Branch(String branch_Name, String country_Code) {
        this.branch_Name = branch_Name;
        this.country_Code = country_Code;
    }
}
