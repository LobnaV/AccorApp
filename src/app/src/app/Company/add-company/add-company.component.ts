import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Company } from '../company';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  
  companyForm = new FormGroup({
    hotel_MegaCode: new FormControl('',[Validators.required]),
    hotel_Name: new FormControl('', [Validators.required]),
  })
  constructor(
    private service:AccorService,
    private router:Router 
  ) { }

  ngOnInit(): void {
  }

  Ajouter(){
    const newCompany = this.companyForm.value;
    console.log(newCompany)
    this.service.addCompany(newCompany)
      .subscribe(
        (company:Company)=>{
          alert("Add successfully")
          this.router.navigate(["companies"])
        }
      )
      // this.Ajouter = function(){
      //   const msg = 'Data sent : ' + JSON.stringify(this.companyForm)
      //   console.log(msg)
        
      //  }
  }



}
