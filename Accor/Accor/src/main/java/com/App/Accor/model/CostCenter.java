package com.App.Accor.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.transaction.annotation.Propagation;

import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.Email;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CostCenter implements Serializable {

    @Id
    private String megaCode_CostCenter_ID;
    private String megaCode_CostCenter_Label;
		@Email
    private User owner_costCenter_email;

   /* @JsonIgnoreProperties("costCenters")
    @ManyToOne()
    private User user;*/



}
