import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AccorService} from '../accor.service';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Param} from "../model/param";
import { Branch } from '../model/branch';
import { LoginComponent } from '../Account/login/login.component';
import { User } from '../model/user';
import { ActivatedRoute } from '@angular/router';

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
    public translate: TranslateService,
    private activatedRoute: ActivatedRoute,
    ) {

    // Register translation languages
    translate.addLangs(['en', 'fr']);
    // Set default language
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {

    this.service.getParams().subscribe(
      (res: HttpResponse<Param[]>) => {
        this.companies = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );

    this.service.branches()
      .subscribe((data: HttpResponse<Branch[]>)  => {
        this.branches = data.body;
        (res: HttpErrorResponse) => console.log(res.message)
      });

  }

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }


}
