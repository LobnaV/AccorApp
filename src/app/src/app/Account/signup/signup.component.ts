import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm = new FormGroup({
    selectCompany: new FormControl,
    primaryBranch: new FormControl,
    //email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })

  parameters: any;
  selectedCompanies = [];



  constructor(
    private router: Router,
    private service: AccorService,
  ) { }

  ngOnInit(): void {
    // this.service.getParams()
    // .subscribe(data => {
    //   this.parameters = data;
    //   console.log('param', this.parameters)
    // })

  }

  ValueChange(event:any){
    console.log("selected value", event?.target.value,
    'all companies', this.parameters)
   }

   save(){
    console.log('value i got', this.selectedCompanies)
   // localStorage.setItem('dataSource', JSON.stringify(this.dataSource));
   // console.log(localStorage.getItem(this.dataSource))
   //console.log(localStorage.getItem( this.dataSource))
   }


  onRegister() {
    const newUser = this.registerForm.value;
    console.log(newUser)
    if (this.registerForm.valid) {
      this.service.register(newUser)
        .subscribe(
          (user: User) => {
            this.router.navigate(["Home"])
            console.log(user);
          }
        )
    }
  }
}




