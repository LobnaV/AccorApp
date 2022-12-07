import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccorService } from 'src/app/accor.service';
import { Branch } from 'src/app/model/branch';
import { CostCenter } from 'src/app/model/costCenter';
import { Param } from 'src/app/model/param';
import { User } from 'src/app/model/user';
import { ConfirmationDialogService } from 'src/app/UserBack/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-update-cc',
  templateUrl: './update-cc.component.html',
  styleUrls: ['./update-cc.component.scss']
})
export class UpdateCcComponent implements OnInit {
  param?: Param;
  costcenter?: CostCenter;
  // companie?: Param;
  userGM?: User | null;
  companie?: Param | null;
  branch?: Branch;

  costCenterForm = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    label: new FormControl(''),
    owner: new FormControl(''),
    company: new FormGroup({
      id: new FormControl(''),
      megaCode: new FormControl(''),
      name: new FormControl(''),
      userGM: new FormGroup({
        id: new FormControl(''),
        username: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
      }),
    }),
  })



  constructor(
    private service: AccorService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      this.loadGM(params['id']);


      const idBranch = params['id'];
      this.service.branchId(idBranch).subscribe(
        (res: HttpResponse<Branch>) => {
          this.branch = res.body!;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );


      const idCostCenter = params['costCenterId'];
      this.service.CostCenterId(idCostCenter).subscribe(
        (res: HttpResponse<CostCenter>) => {
          this.costcenter = res.body!;
          console.log(this.costcenter)
        },
        (res: HttpErrorResponse) => console.log(res.message)
      )

      const paramId = params['paramId'];
      if (paramId) {
        this.service.ParamId(paramId).subscribe(
          (res: HttpResponse<Param>) => {
            this.param = res.body!;
            this.costCenterForm.patchValue({
              id: this.costcenter?.id,
              code: this.costcenter?.code,
              label: this.costcenter?.label,
              owner: this.costcenter?.owner,
              company: {
                id: this.param?.id,
                megaCode: this.param?.megaCode,
                name: this.param?.name,
                userGM: {
                  id: this.param.userGM?.id,
                  username: this.param.userGM?.username,
                  firstName: this.param.userGM?.firstName,
                  lastName: this.param.userGM?.lastName,
                },
              }
            });
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
      } else {
        this.param = new Param();
      }

    });
  }


  loadGM(idCompagnie: number) {
    this.service.ParamId(idCompagnie).subscribe(
      (res: HttpResponse<Param>) => {
        this.companie = res.body;
        this.userGM = this.companie?.userGM;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
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
      this.param);

    if (this.costcenter?.id) {
      this.service.updateCostCenter(updateForm)
        .subscribe(
          (res: HttpResponse<CostCenter>) => {
            this.location.back();
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    } else {
      this.service.addcostCenter(updateForm)
        .subscribe(
          (res: HttpResponse<CostCenter>) => {
            this.location.back();
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    }
  }
}
