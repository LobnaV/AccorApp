import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { CostCenter } from '../cost-center';

@Component({
  selector: 'app-add-cost-center',
  templateUrl: './add-cost-center.component.html',
  styleUrls: ['./add-cost-center.component.scss']
})
export class AddCostCenterComponent implements OnInit {

  costCenterForm=new FormGroup({
    megaCode_CostCenter_ID:new FormControl('',[Validators.required]),
    megaCode_CostCenter_Label:new FormControl('',[Validators.required]),
    owner_costCenter_email:new FormControl('',[Validators.required]),
  })
  constructor(
    private service:AccorService,
    private router:Router 
  ) { }

  ngOnInit(): void {
  }

  Ajouter(){
    const newCostCenter = this.costCenterForm.value;
    console.log(newCostCenter)
    this.service.addcostCenter(newCostCenter)
      .subscribe(
      (costCenter:CostCenter) =>{
        alert("Add cost center")
        this.router.navigate(["listCostCenter"])

      }
      )
      }
}
