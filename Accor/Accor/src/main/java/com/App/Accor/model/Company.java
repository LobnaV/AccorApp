package com.App.Accor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Company {

    @Id
    private String hotel_MegaCode;
    private String hotel_Name;
		private String general_manager;

    @ManyToMany(mappedBy = "companies")
    private Set<User> users = new HashSet<>();
//    @JoinTable(	name = "company_user",
//            joinColumns = @JoinColumn(name = "company_id"),
//            inverseJoinColumns = @JoinColumn(name = "user_id"))

//    @NotNull
//    @ManyToOne()
//    private Branch branch;

    public Company(String hotel_Name, Set<User> users) {
        this.hotel_Name = hotel_Name;
      //  this.users = users;
    }
}
