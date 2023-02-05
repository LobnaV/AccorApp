import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AccorService} from 'src/app/accor.service';
import {Staff} from 'src/app/model/staff';
import {Location} from '@angular/common';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {Param} from "../../model/param";

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html',
  styleUrls: ['../user.component.scss']
})
export class UpdateStaffComponent implements OnInit {

  staff?: Staff;
  companie?: Param;

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
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
      const idCompagnie = params['id'];
      this.service.ParamId(idCompagnie).subscribe(
        (res: HttpResponse<Param>) => {
          this.companie = res.body!;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );

      const idStaff = params['staffId'];
      if (idStaff) {
        this.service.staffId(idStaff).subscribe(
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
      } else {
        this.staff = new Staff();
      }
    });
  }

  back() {
    this.confirmationDialogService.confirm('Confirmation', 'Are you sure you want to leave this page without saving your changes ?')
      .then(confirmed => {
        if(confirmed) this.location.back();
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'))
  }

  Update() {
    const updateForm = new Staff(
      this.staffForm.get('id')?.value,
      this.staffForm.get('mail')?.value,
      this.staffForm.get('firstName')?.value,
      this.staffForm.get('lastName')?.value,
      this.companie);

    if (this.staff?.id) {
      this.service.updateStaff(updateForm)
        .subscribe(
          (res: any) => {
            // this.location.back();
            console.log('res');
            console.log(res);
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    } else {
      this.service.createStaff(updateForm)
        .subscribe(
          (res: HttpResponse<Staff>) => {
            this.location.back();
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    }
  }

}
