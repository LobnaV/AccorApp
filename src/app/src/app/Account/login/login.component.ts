import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required, Validators.minLength(4)])
  })
  constructor(
    private service: AccorService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(){
  const formValues = this.loginForm.value;
  console.log(formValues);
  this.service.login(formValues)
    .subscribe(
      (resp:any)=>{
        console.log("Connection succed", resp);
        this.router.navigate(['Home']);
      },
      error=>{
        console.log(error);
      }
    )
    }
}
