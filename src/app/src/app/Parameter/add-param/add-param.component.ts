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

 

  constructor(
    private service: AccorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
