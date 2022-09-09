import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {
  params:any;
  parameters: any;
  searchKey: string = "";
  searchTerm: string = "";

  getDataBranch = localStorage.getItem('getDataBranch');
  getDataBranchName = localStorage.getItem('getDataBranchName');

  constructor(
    private service:AccorService,
    private router:Router
  ) { }

  companyParamForm = new FormGroup({
    hotel_MegaCode: new FormControl(''),
    hotel_Name: new FormControl(''),
    branchID: new FormControl(''),
    perimeter: new FormControl(''),
    general_manager: new FormControl('',[Validators.required,Validators.email]),
    email_m_gm: new FormControl('',[Validators.required,Validators.email]),
    portfolio: new FormControl('',[Validators.email]),
    mm_gm: new FormControl('',[Validators.email]),
    mmm_gm: new FormControl('',[Validators.email]), 
    // branch: new FormControl('')
    
  })

  ngOnInit(): void {

    this.getDataBranch = this.getDataBranch!.replace(/[""]/gi, '')
    this.getDataBranchName = this.getDataBranchName!.replace(/[""]/gi, '')


    this.service.getParams()
    .subscribe(data => {
      this.parameters = data;
      console.log(this.parameters)
    })

  this.service.search.subscribe((val: any) => {
    this.searchKey = val;
  })

  }

  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }

  NewParam(){
    this.router.navigate(["AddParam"]);
  }

  remove(paramId:any){
    this.service.deleteParam(paramId)
     .subscribe( (data:any) =>{
       this.params = this.params?.filter((param: { id: any; }) => paramId !== param.id);
         alert("deleted param");
         this.router.navigate(["Parameter"]);
     })
  }
 
  
 }





