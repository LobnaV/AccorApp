import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { CostCenter } from 'src/app/model/costCenter';
import { Param } from 'src/app/model/param';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html'
})
export class CostCenterComponent implements OnInit {

  searchKey: string = '';
  searchTerm: string = '';
  costcenters: CostCenter[] | any = [];
  company?: Param

  constructor(
    private service: AccorService,
    private activatedRoute: ActivatedRoute,
    public location: Location,
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const paramId = params['paramId'];
      this.loadParamCompagny(paramId);
      this.loadCostCenter(paramId);
    });
    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  loadParamCompagny(idCompagnie: number) {
    this.service.ParamId(idCompagnie).subscribe(
      (res: HttpResponse<Param>) => this.company = res.body!,
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  loadCostCenter(idCompagnie: number) {
    this.service.CostCenterCompany(idCompagnie).subscribe(
      (res: HttpResponse<CostCenter[]>) => this.costcenters = res.body,
      (res: HttpErrorResponse) => console.log(res.message)
    )
  }


  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.service.search.next(this.searchTerm);
  }


  back() {
    this.location.back()
  }
}
