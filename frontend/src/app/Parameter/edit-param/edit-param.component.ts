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
  templateUrl: './edit-param.component.html',
  styleUrls: ['./edit-param.component.scss']
})
export class EditParamComponent implements OnInit {

  param?: Param;
  branch?: Branch;
  user?:User;
  categories?: Category[];

  paramForm = new FormGroup({
    id: new FormControl(''),
    megaCode: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    category: new FormControl(''),
    generalManagerN1Mail: new FormControl('', Validators.required),
    userGM: new FormGroup({
      id: new FormControl(''),
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
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
        this.param = new Param();
      }
    })

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

