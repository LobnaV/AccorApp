import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccorService } from 'src/app/accor.service';
import { CostCenter } from 'src/app/model/costCenter';
import { Param } from 'src/app/model/param';

@Component({
  selector: 'app-cost-center-edit',
  templateUrl: './cost-center-edit.component.html'
})
export class CostCenterEditComponent implements OnInit {

  param?: Param;
  error?: string;

  costCenterForm = new FormGroup({
    id: new FormControl(''),
    code: new FormControl('', Validators.required),
    label: new FormControl('', Validators.required),
    owner: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  })



  constructor(
    private service: AccorService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      const idCostCenter = params['costCenterId'];
      if (idCostCenter) {
        this.service.CostCenterId(idCostCenter).subscribe(
          (res: HttpResponse<CostCenter>) => {
            this.param = res.body?.company;
            this.costCenterForm.patchValue({
              id: res.body?.id,
              code: res.body?.code,
              label: res.body?.label,
              owner: res.body?.owner,
              firstName: res.body?.firstName,
              lastName: res.body?.lastName,
            });
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
      } else {
        const paramId = params['paramId'];
        this.service.ParamId(paramId).subscribe(
          (res: HttpResponse<Param>) => {
            this.param = res.body!;
            this.costCenterForm.patchValue({
              owner: res.body?.userGM?.username,
              firstName: res.body?.userGM?.firstName,
              lastName: res.body?.userGM?.lastName,
            });
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
      }
    });
  }

  back(){
    this.location.back()
  }

  Update() {
    const updateForm = new CostCenter(
      this.costCenterForm.get('id')?.value,
      this.costCenterForm.get('code')?.value,
      this.costCenterForm.get('label')?.value,
      this.costCenterForm.get('owner')?.value,
      this.costCenterForm.get('firstName')?.value,
      this.costCenterForm.get('lastName')?.value,
      this.param);

    if (updateForm.id) {
      this.service.updateCostCenter(updateForm)
        .subscribe(
          () => this.location.back(),
          (res: HttpErrorResponse) => this.error = res.error
        );
    } else {
      this.service.addcostCenter(updateForm)
        .subscribe(
          () => this.location.back(),
          (res: HttpErrorResponse) => this.error = res.error
        );
    }
  }
}
