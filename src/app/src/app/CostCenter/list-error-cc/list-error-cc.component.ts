import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccorService } from 'src/app/accor.service';
import { CostCenter } from '../../model/costCenter';

@Component({
  selector: 'app-list-error-cc',
  templateUrl: './list-error-cc.component.html',
  styleUrls: ['./list-error-cc.component.scss']
})
export class ListErrorCcComponent implements OnInit {

  searchKey: string = "";
  searchTerm: string = "";
  costcenters?: CostCenter[] | null = [];

  constructor(
    private service: AccorService,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
  
      this.loadCostCenter(params['id']); 
    });

    console.log(this.costcenters)
   

      this.service.search.subscribe((val: any) => {
        this.searchKey = val;
      })
  }

  loadCostCenter(idCompagnie: number){
    this.service.CostCenterCompany(idCompagnie).subscribe(
      (res: HttpResponse<CostCenter[]>) => {
        this.costcenters = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    )
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

