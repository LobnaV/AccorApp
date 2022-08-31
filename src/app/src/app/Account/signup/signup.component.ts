import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { User } from 'src/app/UserBack/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })


  constructor(
    private router: Router,
    private service: AccorService,
  ) { }

  ngOnInit(): void {

  }


  onRegister() {
    const newUser = this.registerForm.value;
    console.log(newUser)
    if (this.registerForm.valid) {
      this.service.register(newUser)
        .subscribe(
          (user: User) => {
            this.router.navigate(["UserList"])
            console.log(user);
          }
        )
    }
  }
}




