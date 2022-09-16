import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccorService } from 'src/app/accor.service';
import { Staff } from 'src/app/model/staff';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Param } from 'src/app/model/param';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm = new FormGroup({
    id: new FormControl,
    companyParameter: new FormControl,
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
  })

  parameters: any;
  staff?: Staff;
  companie?: Param;


  constructor(
    private service: AccorService,
    private location: Location,
    private activatedRoute: ActivatedRoute,


  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.service.ParamId(params['id']).subscribe(
        (res: HttpResponse<Param>) => {
          console.log(res.body);
          this.companie = res.body!;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
    });

  }

  Ajouter() {

    const newStaff = new Staff(
      undefined,
      this.userForm.get('mail')?.value,
      this.userForm.get('firstName')?.value,
      this.userForm.get('lastName')?.value,
      this.companie);

    console.log(newStaff)

    this.service.createStaff(newStaff).subscribe( 
      (res: HttpResponse<Staff>) => {
        console.log(res.body);
        this.location.back();
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }
}


