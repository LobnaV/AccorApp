import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { CostCenter } from 'src/app/model/costCenter';
import { Param } from 'src/app/model/param';
import { Location } from '@angular/common';
import {ConfirmationDialogService} from "../UserBack/confirmation-dialog/confirmation-dialog.service";

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
    private confirmationDialogService: ConfirmationDialogService,
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

  deleteCc(id: number) {
    this.confirmationDialogService.confirm('Confirmation', 'layouts.commons.messages.delete-cost-center')
      .then((deleteConfirm) => {
        if (deleteConfirm) {
          this.service.deleteCC(id).subscribe(
            () => this.loadCostCenter(this.company?.id!),
            (res: HttpErrorResponse) => console.log(res.message)
          );
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
