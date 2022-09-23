import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccorService } from 'src/app/accor.service';
import { TokenStorageService } from '../../Account/login/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private service: AccorService,
    public translate: TranslateService,
    private tokenStorage: TokenStorageService,
  ) {
  }

  ngOnInit(): void {
  }

  onClickLogout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

}
