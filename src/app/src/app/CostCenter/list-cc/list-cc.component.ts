import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { CostCenter } from 'src/app/model/costCenter';
import { Param } from 'src/app/model/param';

@Component({
  selector: 'app-list-cc',
  templateUrl: './list-cc.component.html',
  styleUrls: ['./list-cc.component.scss']
})
export class ListCcComponent implements OnInit {
  
  searchKey: string = "";
  searchTerm: string = "";
  costcenters?: CostCenter[] | null = [];
  company?: Param

  constructor(
    private service: AccorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
  
      this.loadCostCenter(params['id']); 
      console.log(params['id'])

      const paramId = params['paramId'];
      this.service.ParamId(paramId).subscribe(
        (res: HttpResponse<Param>) => {
          this.company = res.body!;
          console.log(this.company)
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );

    });   

      this.service.search.subscribe((val: any) => {
        this.searchKey = val;
      })
  }

  loadCostCenter(idCompagnie: number){
    this.service.CostCenterCompany(idCompagnie).subscribe(
      (res: HttpResponse<CostCenter[]>) => {
        this.costcenters = res.body;
        console.log(this.costcenters)
      },
      (res: HttpErrorResponse) => console.log(res.message)
    )
  }


  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }


}
