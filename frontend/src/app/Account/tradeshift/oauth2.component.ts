import { Component, OnInit } from '@angular/core';
import { Oauth2Service } from './oauth2.service';
import { Router } from '@angular/router';

@Component({
  template: `<button (click)="logout()">retry</button>`,
  selector: 'app-oauth2-tradeshift'
})
export class Oauth2Component implements OnInit {
  public isLoggedIn = false;

  constructor(
    private authService: Oauth2Service,
    private router: Router) {
  }


  ngOnInit() {
    console.log('hoooome');
    this.isLoggedIn = this.authService.checkCredentials();
    console.log(this.isLoggedIn);
    let i = window.location.href.indexOf('code');
    console.log(i);
    if(!this.isLoggedIn) {
      if (i != -1) {
        this.authService.retrieveToken(window.location.href.substring(i + 5))
          .subscribe(
            (data: any) => {
              this.authService.saveToken(data);
              this.isLoggedIn = this.authService.checkCredentials();
              this.router.navigate(['/login']);
            },
            () => alert('Invalid Credentials'));
      } else {
        this.login();
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  login() {
    window.location.href =
      'https://api-sandbox.tradeshift.com/tradeshift/auth/login?' +
      'response_type=code&' +
      'client_id=' +  Oauth2Service.clientId +'&' +
      'redirect_uri=' +  Oauth2Service.redirectUri +'&' +
      'scope=offline&' +
      'state=';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
