import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccorService } from 'src/app/accor.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private service:AccorService,
    public translate: TranslateService

  ) { }

  ngOnInit(): void {
  }

  onClickLogout() {
    this.service.logout();
  }

   //Switch language
   translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

}
