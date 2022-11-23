import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AccorService} from '../accor.service';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Param} from "../model/param";
import { Branch } from '../model/branch';

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
  allBranches: any = [];


  searchKey: string = "";
  searchTerm: string = "";

  isVueGm = true;

  constructor(
    private service: AccorService,
    public translate: TranslateService,
    ) {

    // Register translation languages
    translate.addLangs(['en', 'fr']);
    // Set default language
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {

    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })

    //Vu General Manager
    this.service.getParams().subscribe(
      (res: HttpResponse<Param[]>) => {
        this.companies = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );

    //Vu Company Admin
    this.service.branches()
      .subscribe((data: HttpResponse<Branch[]>)  => {
        this.branches = data.body;
        (res: HttpErrorResponse) => console.log(res.message)
      });

      //Vu Master

      this.service.allBranches()
        .subscribe((data:HttpResponse<Branch[]>) => {
          this.allBranches = data.body;
          console.log(this.allBranches);
          (res: HttpErrorResponse) => console.log(res.message)
        })


      // this.service.allBranchesSE()
      // .subscribe((data: HttpResponse<Branch[]>)  => {
      //   this.allbranchesSE = data.body;
      //   console.log(this.allbranchesSE[0]);
      //   this.allbranchesSE = this.allbranchesSE[0];
      //   (res: HttpErrorResponse) => console.log(res.message)
      // });

      // this.service.allBranchesNE()
      // .subscribe((data: HttpResponse<Branch[]>)  => {
      //   this.allbranchesNE = data.body;
      //   console.log(this.allbranchesNE);
      //   this.allbranchesNE = this.allbranchesNE[0];
      //   (res: HttpErrorResponse) => console.log(res.message)
      // });
  }

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }


}
