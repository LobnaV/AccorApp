import { Component,Input,OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private service: AccorService,
    private route:ActivatedRoute
    ) {
      
    this.radioTitle = 'select company';
    
    }

  ngOnInit(): void {

    this.service.getParams()
    .subscribe(data => {
      this.companies = data;
      console.log('test1', this.companies)
      // this.companies.push(data)
      // console.log('test2', this.companies.push(data)
      // )
    })


  }
 

 ValueChange(event:any){
  console.log("selected value", event?.target.value)
 }

   save(data:any){
    data = this.selectedCompanies;
    console.log('save data',data)

    localStorage.setItem('dataSource', JSON.stringify(data))
  } 
 
}
