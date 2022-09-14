import { Component,OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccorService } from '../accor.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']

})
export class MainPageComponent implements OnInit {
  selectedCompanie?: any;
  selectedBranch?:any;
  companies: any = [];
  branches: any = [];



  constructor(
    private service: AccorService,
    public translate: TranslateService
    ) {
      // Register translation languages
    translate.addLangs(['en','fr']);
    // Set default language
    translate.setDefaultLang('en');
    }

  ngOnInit(): void {
    this.service.getParams()
    .subscribe(data => {
      this.companies = data;
    });

    this.service.branches()
    .subscribe(data => {
      this.branches = data;
    });
  }

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

}
