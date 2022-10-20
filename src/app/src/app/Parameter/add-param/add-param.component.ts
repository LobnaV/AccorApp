import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { Param } from '../../model/param';

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
  }

}
