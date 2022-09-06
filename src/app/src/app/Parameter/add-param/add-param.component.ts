import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Param } from '../param';

@Component({
  selector: 'app-add-param',
  templateUrl: './add-param.component.html',
  styleUrls: ['./add-param.component.scss']
})
export class AddParamComponent implements OnInit {
  
  companyParamForm = new FormGroup({
    hotel_MegaCode: new FormControl(''),
    hotel_Name: new FormControl(''),
    branchID: new FormControl(''),
    perimeter: new FormControl(''),
    general_manager: new FormControl('',[Validators.required,Validators.email]),
    portfolio: new FormControl('',[Validators.email]),
    mm_gm: new FormControl('',[Validators.email]),
    mmm_gm: new FormControl('',[Validators.email]), 
    // branch: new FormControl('')
    
  })

  rolesParam:any = [
    {id: 1, name: "GM"}, 
    {id: 2, name: "GG_GM"},
    {id: 3, name: "GGG_GM"}
  ]
  
  constructor(
    private service: AccorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  Ajouter(){
    const newParam = this.companyParamForm.value
    console.log(newParam)
    this.service.addParam(newParam)
     .subscribe(
       (param:Param) => {
          
          alert("add successfully")
          this.router.navigate(["Parameter"]);
       
       }
 
     )
 
      }
}
