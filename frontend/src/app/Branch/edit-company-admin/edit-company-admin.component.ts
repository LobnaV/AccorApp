import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccorService } from 'src/app/accor.service';
import { Branch } from 'src/app/model/branch';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edit-company-admin',
  templateUrl: './edit-company-admin.component.html'
})
export class EditCompanyAdminComponent implements OnInit {


  branch?: Branch;
  user?: User;
  userCA?:any = [];

  managerForm = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    userMGM: new FormGroup({
      id: new FormControl(''),
      username: new FormControl(''),
    }),
    perimeter: new FormControl(''),

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
          this.userCA = this.branch?.userMGM
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );

      if (idBranch) {
        this.service.branchId(idBranch).subscribe(
          (res: HttpResponse<Branch>) => {
            this.branch = res.body!;
            this.managerForm.patchValue({
              id: this.branch?.id,
              code: this.branch?.code,
              name: this.branch?.name,
              userMGM: {
                id: this.branch?.userMGM?.id,
                username: this.branch?.userMGM?.username,
              },
              perimeter: this.branch?.perimeter,
            });
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
      } else {
        this.branch = new Branch()
      }
    })

  }

  Add() {
    let doc = <HTMLElement> document.querySelector(".form")
    let template =
  `<div class="template">
    <input type="text" formControlName="id" hidden>
    <div class="form-group row">
      <label class="col-sm-2 col-form-label" for="userMGM">{{'PARAM.EMAIL_GM' | translate}}</label>
     <div class="col-sm-3" style="width: 35%;">
          <input type="email" id='userMGM' class="form-control" formControlName="username">
          <button (click)="remove(userCA?.id)" class="btn-delete">delete</button>
      </div>
    </div>
   </div>`;

    // if(this.inputTxt != ''){
    //  this.list.push(this.inputTxt);
    // }

    doc.innerHTML += template
    return;
  }

  Update() {

    const updateForm = {
      ...new Branch(),
      id: this.managerForm.get('id')?.value,
      code: this.managerForm.get('code')?.value,
      name: this.managerForm.get('name')?.value,
      userMGM: this.managerForm.get('userMGM')?.value,
      perimeter: this.managerForm.get('perimeter')?.value,
    };
    console.log(updateForm);

    if (this.branch?.id) {
      this.service.updateBranch(updateForm)
        .subscribe(
          (res: HttpResponse<Branch>) => {
            console.log('update ok')
            this.location.back()
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    } else {
      this.service.addBranch(updateForm)
        .subscribe(
          (res: HttpResponse<Branch>) => {
            this.location.back();
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    }

  }

  remove(userId: any) {
    this.service.deleteUser(userId)
      .subscribe((data: any) => {
        this.userCA = this.userCA?.filter((userx: { id: any; }) => userId !== userx.id);
        console.log("utilisateur supprimé");
      }
      );
  }

}
