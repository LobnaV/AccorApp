import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccorService } from 'src/app/accor.service';
import { Param } from 'src/app/model/param';
import { TokenStorageService } from '../../Account/login/token-storage.service';
import { Router } from '@angular/router';
import {Oauth2Service} from "../../Account/tradeshift/oauth2.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  role?: string;
  companie?: Param | null;


  constructor(
    private router: Router,
    private service: AccorService,
    public translate: TranslateService,
    public tsOAuthService: Oauth2Service,
    private tokenStorage: TokenStorageService
  ) {
    this.role = window.sessionStorage.getItem('roleCurrentUser')!;
  }

  ngOnInit(): void {
  }

  onClickLogout() {
    this.tokenStorage.signOut();
    this.tsOAuthService.logout();
    this.router.navigate(['/']);
  }

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

}
