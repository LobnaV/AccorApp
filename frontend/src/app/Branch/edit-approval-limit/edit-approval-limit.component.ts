import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccorService } from 'src/app/accor.service';
import { Branch } from 'src/app/model/branch';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edit-approval-limit',
  templateUrl: './edit-approval-limit.component.html'
})
export class EditApprovalLimitComponent implements OnInit {
  branch?: Branch;
  user?: User;
  users: any = [];
  selectedUser?: any;




  managerForm = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    userMGM: new FormGroup({
      id: new FormControl(''),
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      approval_limit: new FormControl(''),
    }),
    perimeter: new FormControl(''),

  })


  constructor(
    private service: AccorService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {

    this.service.users()
    .subscribe((data: HttpResponse<User[]>)  => {
      this.users = data.body;
      (res: HttpErrorResponse) => console.log(res.message)
      console.log('userssss', this.users)
    });

    this.route.params.subscribe(params => {

      const idBranch = params['id'];
      this.service.branchId(idBranch).subscribe(
        (res: HttpResponse<Branch>) => {
          this.branch = res.body!;
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
                firstName: this.branch?.userMGM?.firstName,
                lastName: this.branch?.userMGM?.lastName,
                approval_limit: this.branch?.userMGM?.approval_limit,
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

  back(){
    this.location.back()
  }
}
