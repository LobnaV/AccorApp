import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AccorService} from 'src/app/accor.service';
import {Staff} from 'src/app/model/staff';
import {Location} from '@angular/common';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {Param} from "../../model/param";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-update-staff',
  templateUrl: './update-staff.component.html'
})
export class UpdateStaffComponent implements OnInit {

  staff?: Staff;
  companie?: Param;
  errorUniqueStaffMail?: string;
  error?: string;

  staffForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    mail: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(
    private service: AccorService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public translate: TranslateService,
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
    this.confirmationDialogService.confirm('Confirmation', 'layouts.commons.messages.leave')
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
          () => this.location.back(),
          (res: HttpErrorResponse) => this.handleExceptions(res.error)
        );
    } else {
      this.service.createStaff(updateForm)
        .subscribe(
          (res: HttpResponse<Staff>) => this.location.back(),
          (res: HttpErrorResponse) => this.handleExceptions(res.error)
        );
    }
  }

  private handleExceptions(message: string) {
    if (message === 'uniqueStaffMail') {
      this.errorUniqueStaffMail = message;
      this.error = undefined;
    } else {
      this.error = message;
      this.errorUniqueStaffMail = undefined;
    }
  }

}
