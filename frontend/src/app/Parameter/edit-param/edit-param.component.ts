import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Param } from '../../model/param';
import { Location } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Branch } from 'src/app/model/branch';
import { User } from 'src/app/model/user';
import { Category } from "../../model/category";

@Component({
  selector: 'app-edit-param',
  templateUrl: './edit-param.component.html'
})
export class EditParamComponent implements OnInit {

  param?: Param;
  branch?: Branch;
  user?:User;
  categories?: Category[];
  error?: string;

  paramForm = new FormGroup({
    id: new FormControl(null),
    megaCode: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    category: new FormControl(null, Validators.required),
    generalManagerN1Mail: new FormControl(null, Validators.required),
    userGM: new FormGroup({
      id: new FormControl(null),
      username: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
    })
  })

  constructor(
    private service: AccorService,
    private route: ActivatedRoute,
    private location: Location,
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
      this.service.getCategories().subscribe(
        (res: HttpResponse<Category[]>) => {
          this.categories = res.body!;
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
              category: this.param?.category,
              generalManagerN1Mail: this.param?.generalManagerN1Mail,
              userGM: {
                id: this.param.userGM?.id,
                username: this.param.userGM?.username,
                firstName: this.param.userGM?.firstName,
                lastName: this.param.userGM?.lastName,
              },
            });
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
      } else {
        // this.param = new Param();
      }
    })

  }

  back(){
    this.location.back()
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  compareObjects(a: any, b: any) {
    return a != null && b != null ? a.id === b.id : false;
  }

  Update() {
   const updateForm = {
    ...new Param(),
    id: this.paramForm.get('id')?.value,
    megaCode: this.paramForm.get('megaCode')?.value,
    name: this.paramForm.get('name')?.value,
    category: this.paramForm.get('category')?.value,
    generalManagerN1Mail: this.paramForm.get('generalManagerN1Mail')?.value,
    userGM: this.paramForm.get('userGM')?.value,
    branch: this.branch,
    dispacherMail: this.paramForm.get('userGM.username')?.value
   };

    console.log(updateForm);

  if(this.param?.id){
    this.service.updateParam(updateForm)
      .subscribe(
        () => this.location.back(),
        (res: HttpErrorResponse) => this.error = res.error
      );
    }else{
      this.service.addParam(updateForm)
        .subscribe(
          () => this.location.back(),
          (res: HttpErrorResponse) => this.error = res.error
        );
    }
  }




}

