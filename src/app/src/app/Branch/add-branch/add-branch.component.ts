import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Branch } from '../../model/branch';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  //private companies: any = [];


  constructor(
    private service:AccorService,
    private router:Router,
    private fb: FormBuilder
  ) { }

  branchForm = this.fb.group({
    branch_Id:new FormControl('',[Validators.required]),
    branch_Name:new FormControl('',[Validators.required]),
    country_Code:new  FormControl('',[Validators.required]),
    perimeter:new FormControl('',[Validators.required]),
  })
  companies = this.fb.group({
    hotel_MegaCode: new FormControl('',[Validators.required]),
    hotel_Name: new FormControl('', [Validators.required]),
  })

  ngOnInit(): void {
  }

  Ajouter(){
    const NewBranch = this.branchForm.value;
    const NewCompanyInBranch = this.companies.value;
    console.log(NewBranch, NewCompanyInBranch)
    this.service.addBranch(NewBranch)
      .subscribe(
        (branch:Branch) => {
          this.service.addBranch(NewCompanyInBranch)
            .subscribe(
              (branchCompany:Branch) =>{

                alert("Add Succesfully")
                this.router.navigate(['branchs'])
              }
            )
        }
      )
  }

}
