import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Param } from 'src/app/model/param';
import { FormControl, FormGroup } from '@angular/forms';
import { AccorService } from 'src/app/accor.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CostCenter } from 'src/app/model/costCenter';


@Component({
  selector: 'app-cost-center-edit',
  templateUrl: './cost-center-edit.component.html',
  styleUrls: ['../cost-center.component.scss']
})
export class CostCenterEditComponent implements OnInit {

  companie?: Param;
  costcenter?: CostCenter;

  costCenterForm = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    label: new FormControl(''),
    owner: new FormControl(''),
  })

  constructor(
    private service: AccorService,
    public location: Location,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      const idCompagnie = params['id'];
      const idCostCenter = params['costCenterId'];

      this.loadParamCompagny(idCompagnie);
      this.loadCostCenter(idCostCenter);
    });

  }

  loadParamCompagny(idComapgnie: number) {
    this.service.ParamId(idComapgnie).subscribe(
      (res: HttpResponse<Param>) => this.companie = res.body!,
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  loadCostCenter(idCostCenter: number) {
    this.service.CostCenterId(idCostCenter).subscribe(
      (res: HttpResponse<CostCenter>) => {
        this.costcenter = res.body!;
        this.costCenterForm.patchValue({
          id: this.costcenter?.id,
          code: this.costcenter?.code,
          label: this.costcenter?.label,
          owner: this.costcenter?.owner,
        })
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  updateCC() {

    const updateCostCenter = new CostCenter(
      this.costCenterForm.get('id')?.value,
      this.costCenterForm.get('code')?.value,
      this.costCenterForm.get('label')?.value,
      this.costCenterForm.get('owner')?.value,
      this.companie);

    this.service.updateCostCenter(updateCostCenter).subscribe(
      () => this.location.back(),
      (res: HttpErrorResponse) => console.log(res.message)
    )
  }

  updateOwner(email: string, isStaff: boolean) {
    this.service.updateOwner(this.costcenter?.id!, email, isStaff).subscribe(
      (response: HttpResponse<CostCenter>) => {
        this.costcenter = response.body!;

      },
      (res: HttpErrorResponse) => {
        console.log(res.message);
      }
    );

  }
}
