import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Param } from '../../model/param';
import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Branch } from 'src/app/model/branch';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edit-param',
  templateUrl: './edit-param.component.html',
  styleUrls: ['./edit-param.component.scss']
})
export class EditParamComponent implements OnInit {

  param?: Param;
  branch?: Branch;


  paramForm = new FormGroup({
    id: new FormControl(''),
    megaCode: new FormControl(''),
    name: new FormControl(''),
    userGM: new FormGroup({
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    }),
    userMGM: new FormControl('')
  })

  constructor(
    private service: AccorService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      const idBranch = params['id'];
      this.service.branchId(idBranch).subscribe(
        (res: HttpResponse<Branch>) => {
          this.branch = res.body!;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );


      const paramId = params['paramId'];
      if(paramId){
        this.service.ParamId(paramId).subscribe(
          (res: HttpResponse<Param>) => {
            this.param = res.body!;
            this.paramForm.patchValue({
              id: this.param?.id,
              megaCode: this.param?.megaCode,
              name: this.param?.name,
              userGM: {
                username: this.param.userGM?.username,
                firstName: this.param.userGM?.firstName,
                lastName: this.param.userGM?.lastName, 
              },
              userMGM: this.branch?.userMGM?.username
            });
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
      } else {
        this.param = new Param();
      }
    })
  }

  Update() {
    //const updateForm = this.paramForm.value;
   const updateForm = {
    ...new Param(),
    id: this.paramForm.get('id')?.value,
    megaCode: this.paramForm.get('megaCode')?.value,
    name: this.paramForm.get('name')?.value,
    userGM: this.paramForm.get('userGM')?.value,
    branch: this.branch,
    dispacherMail: this.paramForm.get('userGM.username')?.value
   };

    console.log(updateForm);

  if(this.param?.id){
    this.service.updateParam(updateForm)
      .subscribe(
        (res: HttpResponse<Param>) => {
          console.log('update ok')
          this.location.back();
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
    }else{
      this.service.addParam(updateForm)
        .subscribe(
          (res:HttpResponse<Param>) => {
            this.location.back();
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    }
  }

}
