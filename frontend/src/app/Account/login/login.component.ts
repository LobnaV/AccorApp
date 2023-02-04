import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "./auth.service";
import {TokenStorageService} from "./token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // loginForm = new FormGroup({
  //   username: new FormControl('', [Validators.required]),
  //   password: new FormControl('', [Validators.required, Validators.minLength(4)])
  // })
  // isLoggedIn = false;
  // isLoginFailed = false;
  // errorMessage = '';
  // roles: string[] = [];
  public isLoggedIn = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private authService: AuthService,
    private router: Router) {
  }


  ngOnInit() {
    console.log('hoooome');
    this.isLoggedIn = this.authService.checkCredentials();
    console.log(this.isLoggedIn);
    let i = window.location.href.indexOf('code');
    console.log(i);
    if(!this.isLoggedIn && i != -1) {
      this.authService.retrieveToken(window.location.href.substring(i + 5))
        .subscribe(
          data => {
            this.authService.saveToken(data);
            this.isLoggedIn = this.authService.checkCredentials();
          },
          err => alert('Invalid Credentials'));
    }
  }

  login() {
    window.location.href =
      'https://api-sandbox.tradeshift.com/tradeshift/auth/login?' +
      'response_type=code&' +
      'client_id=' +  this.authService.clientId +'&' +
      'redirect_uri=' +  this.authService.redirectUri +'&' +
      'scope=offline&' +
      'state=';
  }

  logout() {
    this.authService.logout();
  }
  // }

  // ngOnInit(): void {
  //   if (this.tokenStorage.getToken()) {
  //     this.isLoggedIn = true;
  //     this.roles = this.tokenStorage.getUser().roles;
  //   }
  // }
  //
  // onLogin() {
  //   const formValues = this.loginForm.value;
  //   console.log(formValues);
  //
  //   this.authService.login(this.loginForm.value).subscribe(
  //     data => {
  //       console.log(data);
  //       this.tokenStorage.saveToken(data.token);
  //       this.tokenStorage.saveUser(data.username);
  //
  //       this.isLoginFailed = false;
  //       this.isLoggedIn = true;
  //       this.roles = this.tokenStorage.getUser().roles;
  //       this.router.navigate(['Home']);
  //     },
  //     err => {
  //       this.errorMessage = err.error.message;
  //       this.isLoginFailed = true;
  //     }
  //   );
  // }
}
