import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Param } from '../param';

@Component({
  selector: 'app-edit-param',
  templateUrl: './edit-param.component.html',
  styleUrls: ['./edit-param.component.scss']
})
export class EditParamComponent implements OnInit {

  param :Param = new Param();

  editCompanyParamForm = new FormGroup({
    hotel_MegaCode: new FormControl(''),
    perimeter: new FormControl(''),
    general_manager: new FormControl(''),
    portfolio: new FormControl(''),
    mm_gm: new FormControl(''),
    mmm_gm: new FormControl(''), 
    // branch: new FormControl('')
    
  })
  constructor(
    private service: AccorService,
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const paramId = this.route.snapshot.params['paramId'];
    this.service.ParamId(paramId)
      .subscribe(
        (param:Param) => {
          this.editCompanyParamForm.patchValue(param)
          console.log(param)
        }
      )
  }

  UpdateParam(){
    const updateForm = this.editCompanyParamForm.value;
    this.service.updateParam(updateForm)
    .subscribe(
      (param:Param) =>{
          console.log('update ok')
          this.router.navigate(["Parameter"])
        }
      )
  }

}
