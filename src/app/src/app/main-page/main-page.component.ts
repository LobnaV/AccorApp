import { Component,Input,OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from '../accor.service';
import { Company } from '../Company/company';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']

})
export class MainPageComponent implements OnInit {
  selectedCompanies = [];
  companies: any = [];
  radioTitle: string;
  model   = this.companies.general_manager;

   data!: number;

   getUserEmail = localStorage.getItem('User_Email');


  constructor(
    private service: AccorService,
    private router: Router
    ) {  
    this.radioTitle = 'select company';
    }

    element:any;

  ngOnInit(): void {

    this.getUserEmail  = this.getUserEmail !.replace(/[""]/gi, '')
    console.log(this.getUserEmail )


    this.service.getParams()
    .subscribe(data => {
      this.companies = data;
      
      for (let i = 0; i < data.length; i++) {
        this.element = data[i];
        console.log('test1', this.element.general_manager)        
      }


    })
  }
 

 ValueChange(event:any){
  console.log("selected value", event?.target.value)
 }

  save(data:any){
    data = this.selectedCompanies;
    
    localStorage.setItem('getDataHmc', JSON.stringify(data.hmc))
    localStorage.setItem('getDataHn', JSON.stringify(data.hn))
    localStorage.setItem('getDataGm', JSON.stringify(data.gm))
    localStorage.setItem('getDataBranch', JSON.stringify(data.branch))
    
    console.log('save data',data)  


    this.router.navigate(["UserList"]);

  } 

 
 
}
