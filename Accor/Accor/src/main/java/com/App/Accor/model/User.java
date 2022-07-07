package com.App.Accor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    @Column(unique=true)
    private String email;
    private String type;
		private Boolean primaryBranch;

    @ManyToMany()
    private Set<Company>companies = new HashSet<>();


    //@JsonIgnore
    @OneToMany()
    private Set<CostCenter> costCenters = new HashSet<>();

    public User(String firstName,String lastName, String email, String type, Set<CostCenter> costCenters) {
        this.lastName = lastName;
				this.firstName = firstName;
				this.email = email;
        this.type = type;
        this.costCenters = costCenters;
    }
}
