import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccorService } from '../accor.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Param } from '../model/param';
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

  role?: string;

  searchKey: string = '';
  searchTerm: string = '';

  constructor(
    private service: AccorService,
    public translate: TranslateService,
  ) {
    this.role = window.sessionStorage.getItem('roleCurrentUser')!;
  }

  ngOnInit(): void {

    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })

    if (this.role === 'ROLE_GM') {
      //Vu General Manager
      this.service.getParams().subscribe(
        (res: HttpResponse<Param[]>) => {
          this.companies = res.body;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
    } else if (this.role === 'ROLE_COMPANYADMIN') {
      //Vu Company Admin
      this.service.branches()
        .subscribe((data: HttpResponse<Branch[]>) => {
          this.branches = data.body;
          (res: HttpErrorResponse) => console.log(res.message)
        });
    } else if (this.role === 'ROLE_MASTERADMIN') {
      //Vu Master
      this.service.allBranches()
        .subscribe((data: HttpResponse<Branch[]>) => {
          this.allBranches = data.body;
          console.log(this.allBranches);
          (res: HttpErrorResponse) => console.log(res.message)
        })
    }
  }

  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }


}
