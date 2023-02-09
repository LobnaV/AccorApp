import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccorService } from 'src/app/accor.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CostCenter } from 'src/app/model/costCenter';


@Component({
  selector: 'app-cost-center-edit-gm',
  templateUrl: './cost-center-edit-gm.component.html',
  styleUrls: ['../cost-center.component.scss']
})
export class CostCenterEditGmComponent implements OnInit {

  costcenter?: CostCenter;
  notTheSame = false;

  costCenterForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    owner: new FormControl('', Validators.required),
    owner_conf: new FormControl('', Validators.required),
  })

  constructor(
    private service: AccorService,
    public location: Location,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const idCostCenter = params['costCenterId'];
      this.loadCostCenter(idCostCenter);
    });
  }

  loadCostCenter(idCostCenter: number) {
    this.service.CostCenterId(idCostCenter).subscribe(
      (res: HttpResponse<CostCenter>) => {
        this.costcenter = res.body!;
        this.costCenterForm.patchValue({
          firstName: res.body?.firstName,
          lastName: res.body?.lastName,
          owner: res.body?.owner,
          owner_conf: res.body?.owner,
        })
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  updateCC() {
    if (this.costCenterForm.get('owner')?.value === this.costCenterForm.get('owner_conf')?.value) {
      const updateCostCenter = this.costcenter!;
      updateCostCenter.firstName = this.costCenterForm.get('firstName')?.value
      updateCostCenter.lastName = this.costCenterForm.get('lastName')?.value
      updateCostCenter.owner = this.costCenterForm.get('owner')?.value
      this.service.updateCostCenter(updateCostCenter).subscribe(
        () => this.location.back(),
        (res: HttpErrorResponse) => console.log(res.message)
      )
    } else {
      this.notTheSame = true;
    }
  }
}
