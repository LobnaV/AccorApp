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
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['../user.component.scss']
})
export class UpdateStaffComponent implements OnInit {

  staff?: Staff;

  staffForm = new FormGroup({
   id: new FormControl(''),
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
          this.staffForm.patchValue({
            id: this.staff?.id,
            firstName: this.staff?.firstName,
            lastName: this.staff?.lastName,
            mail: this.staff?.mail
          });
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
    });
  }

  back(){
    this.confirmationDialogService.confirm('Confirmation', 'Are you sure you want to leave this page without saving your changes ?')
    .then(() => this.location.back())
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'))
  }

  Update() {
    const updateForm = new Staff(
      this.staff?.id,
      this.staffForm.get('mail')?.value,
      this.staffForm.get('firstName')?.value,
      this.staffForm.get('lastName')?.value,
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
