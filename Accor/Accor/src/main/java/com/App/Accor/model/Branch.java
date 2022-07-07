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
    private String branch_Id;
    private String branch_Name;
    private String country_Code;
    @NotNull
    @Enumerated(EnumType.STRING)
    private EPerimeter perimeter;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    //mappedBy = "branch"
    private Set<Company> companies = new HashSet<>();



    public Branch(String branch_Name, String country_Code, Set<Company> companies) {
        this.branch_Name = branch_Name;
        this.country_Code = country_Code;
        this.companies = companies;
    }
}