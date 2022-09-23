import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AccorService} from 'src/app/accor.service';
import {Location} from '@angular/common';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ConfirmationDialogService} from '../confirmation-dialog/confirmation-dialog.service';
import {Param} from "../../model/param";
import {User} from "../../model/user";

@Component({
  selector: 'app-update-user-gm',
  templateUrl: './update-user-gm.component.html',
  styleUrls: ['../user.component.scss']
})
export class UpdateUserGmComponent implements OnInit {

  user?: User;
  companie?: Param;

  userForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl({value: '', disabled: true}),
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

      const userId = params['userId'];
      if (userId) {
        this.service.userId(userId).subscribe(
          (res: HttpResponse<User>) => {
            this.user = res.body!;
            this.userForm.patchValue({
              id: this.user?.id,
              firstName: this.user?.firstName,
              lastName: this.user?.lastName,
              username: this.user?.username
            });
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
      } else {
        this.user = new User();
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
    const updateForm = new User(
      this.userForm.get('id')?.value,
      this.userForm.get('username')?.value,
      this.userForm.get('firstName')?.value,
      this.userForm.get('lastName')?.value);
    this.service.updateUserName(updateForm)
      .subscribe(
        (res: HttpResponse<User>) => {
          this.location.back();
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
  }

}
