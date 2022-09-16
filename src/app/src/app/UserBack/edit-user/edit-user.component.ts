import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { Staff } from 'src/app/model/staff';
import { User } from '../../model/user';
import { Location } from '@angular/common';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Param} from "../../model/param";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  private _fb: any;
  form: any;
  type = 'Head of Department';
  params:any;
  parameters: any;

  displayStyle = "none";


  user: User = new User();
  staff?: Staff;

  userForm = new FormGroup({
   firstName: new FormControl(''),
   lastName: new FormControl(''),
   mail: new FormControl(''),
  })

  constructor(
    private service: AccorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.service.staffId(params['id']).subscribe(
        (res: HttpResponse<Staff>) => {
          this.staff = res.body!;
          this.userForm.patchValue({
            firstName: this.staff.firstName,
            lastName: this.staff.lastName,
            mail: this.staff.mail
          });
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
    });
  }

  trueOrFalse(){
    if(this.userForm.value.primaryBranch == 'true'){
      return 'TRUE'
    }else{
      return 'FALSE'
    }
  }

  back(){
    if(confirm("Are you sure you want to leave this page without saving your changes ? ")) {
      this.location.back()
    }
  }

  Update() {
    const updateForm = new Staff(
      this.staff?.id,
      this.userForm.get('mail')?.value,
      this.userForm.get('firstName')?.value,
      this.userForm.get('lastName')?.value,
      this.staff?.companyParameter);

      this.service.updateStaff(updateForm).subscribe(
        (res: HttpResponse<Staff>) => {
          console.log("update ok");
          console.log(res.body);
          this.location.back();

        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
   }

}
