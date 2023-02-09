import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import {Oauth2Service} from "../tradeshift/oauth2.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  })
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private tokenStorage: TokenStorageService,
    private oAuthTSService: Oauth2Service,
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    const isConnectedTs = this.oAuthTSService.checkCredentials();
    console.log('isConnectedTs');
    console.log(isConnectedTs);
    if (!isConnectedTs) {
      this.router.navigate(['']);
    } else if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onLogin() {
    const formValues = this.loginForm.value;
    console.log(formValues);

    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.username);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = data.roles;
        window.sessionStorage.setItem('roleCurrentUser', data.roles[0]);

        this.router.navigate(['Home']);

        //console.log(this.roles)
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
