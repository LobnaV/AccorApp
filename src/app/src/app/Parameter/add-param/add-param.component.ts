import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { Param } from '../param';

@Component({
  selector: 'app-add-param',
  templateUrl: './add-param.component.html',
  styleUrls: ['./add-param.component.scss']
})
export class AddParamComponent implements OnInit {

  getDataHmc = localStorage.getItem('getDataHmc');
  getDataGm = localStorage.getItem('getDataGm');
  getDataBranch = localStorage.getItem('getDataBranch');
  getDataBranchName = localStorage.getItem('getDataBranchName');

  companyParamForm = new FormGroup({
    hotel_MegaCode: new FormControl(''),
    hotel_Name: new FormControl(''),
    branchID: new FormControl(''),
    branchName:new FormControl(''),
    perimeter: new FormControl(''),
    general_manager: new FormControl('',[Validators.required,Validators.email]),
    lastName_gm: new FormControl('',[Validators.required]),
    firstName_gm: new FormControl('',[Validators.required]),
    email_m_gm: new FormControl('',[Validators.required,Validators.email]), 
    lastName_m_gm: new FormControl('',[Validators.required]),
    firstName_m_gm: new FormControl('',[Validators.required]),
    // branch: new FormControl('')
  })
  
  constructor(
    private service: AccorService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getDataHmc = this.getDataHmc!.replace(/[""]/gi, '')
    this.getDataGm = this.getDataGm!.replace(/[""]/gi, '')
    this.getDataBranch = this.getDataBranch!.replace(/[""]/gi, '')
    this.getDataBranchName = this.getDataBranchName!.replace(/[""]/gi, '')


  }

  approvalLimit() {
    if (this.companyParamForm.value.general_manager) {
      return '10000'
    } else if(this.companyParamForm.value.email_m_gm) {
      return '50000'
    }else{
      return false
    }
  }

  trueOrFalse(){
    if(this.companyParamForm.value.primaryBranch == true){
      return 'TRUE'
    }else{
      return 'FALSE'
    }
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

     const limit = this.approvalLimit();
     const branche = this.getDataBranch;
     const gm = this.getDataGm;
     const home = this.trueOrFalse();
     const spend_limit = 10000;



     const data = [
      [branche, home, this.companyParamForm.value.general_manager, this.companyParamForm.value.firstName_gm, this.companyParamForm.value.lastName_gm, 'ACTIVE', gm, limit, spend_limit, '','General manager']
    ];

    let options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: ['BranchId', 'HOME', 'Email', 'First Name', 'Last Name', 'State', 'Manager', 'Approval limit', 'Spend_limit', 'Owned Cost Center', 'User type']
    };
    console.log('dataFormtoCSV', data)

    new ngxCsv(data, "Accortemplateuserssheet", options)
      }
}
