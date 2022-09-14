import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AccorService} from '../accor.service';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Param} from "../model/param";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']

})
export class MainPageComponent implements OnInit {
  selectedCompanie?: Param;
  selectedBranch?: any;
  companies: Param[] | null = [];
  branches: any = [];


  constructor(
    private service: AccorService,
    public translate: TranslateService
  ) {
    // Register translation languages
    translate.addLangs(['en', 'fr']);
    // Set default language
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.service.getParams().subscribe(
      (res: HttpResponse<Param[]>) => {
        console.log(res.body);
        this.companies = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );

    this.service.branches()
      .subscribe(data => {
        this.branches = [];
      });
  }

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }


}
