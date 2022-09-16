import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Staff } from 'src/app/model/staff';
import { User } from '../../model/user';
import { Location } from '@angular/common';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  params:any;
  parameters: any;

  user: User = new User();
  staff?: Staff;

  userForm = new FormGroup({
   firstName: new FormControl(''),
   lastName: new FormControl(''),
   mail: new FormControl(''),
  })

  constructor(
    private service: AccorService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private confirmationDialogService: ConfirmationDialogService,

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

  // trueOrFalse(){
  //   if(this.userForm.value.primaryBranch == 'true'){
  //     return 'TRUE'
  //   }else{
  //     return 'FALSE'
  //   }
  // }

  back(){
    this.confirmationDialogService.confirm('Confirmation', 'Are you sure you want to leave this page without saving your changes ?')
    .then(() => this.location.back())
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'))     
  }

  Update() {
    const updateForm = new Staff(
      this.staff?.id,
      this.userForm.get('mail')?.value,
      this.userForm.get('firstName')?.value,
      this.userForm.get('lastName')?.value,
      this.staff?.companyParameter);

      this.service.updateStaff(updateForm)
      .subscribe(
        (res: HttpResponse<Staff>) => {
          console.log("update ok");
          console.log(res.body);
          this.location.back();
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
   }

}
