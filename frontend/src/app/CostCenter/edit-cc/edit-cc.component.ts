import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Staff } from 'src/app/model/staff';
import { Param } from 'src/app/model/param';
import { FormControl, FormControlDirective, FormGroup } from '@angular/forms';
import { AccorService } from 'src/app/accor.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/UserBack/confirmation-dialog/confirmation-dialog.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { CostCenter } from 'src/app/model/costCenter';


@Component({
  selector: 'app-cost-center-edit',
  templateUrl: './edit-cc.component.html',
  styleUrls: ['./edit-cc.component.scss']
})
export class EditCCComponent implements OnInit {

  staff?: Staff;
  staffs?: Staff[] | null = [];
  companie?: Param;
  costcenter?: CostCenter;
  staffForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    mail: new FormControl(''),
  })

  costCenterForm = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    label: new FormControl(''),
    owner: new FormControl(''),
  })

  constructor(
    private service: AccorService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,

  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {

      this.loadStaff(params['id']);

      const idCompagnie = params['id'];
      this.service.ParamId(idCompagnie).subscribe(
        (res: HttpResponse<Param>) => {
          this.companie = res.body!;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );

      const idCostCenter = params['costCenterId'];
      this.service.CostCenterId(idCostCenter).subscribe(
        (res: HttpResponse<CostCenter>) => {
          this.costcenter = res.body!;
          this.costCenterForm.patchValue({
            id: this.costcenter?.id,
            code: this.costcenter?.code,
            label: this.costcenter?.label,
            owner: this.costcenter?.owner,
          })

          for (let i = 0; i < this.staffs!.length; i++) {
            const element = this.staffs![i].mail;
            const elementId = this.staffs![i].id
            console.log(elementId)
            console.log(this.costcenter?.owner)

            if (this.costcenter?.owner === element!) {


              const idStaff = params['staffId'];
              if (elementId) {
                console.log(idStaff)
                this.service.staffId(elementId).subscribe(
                  (res: HttpResponse<Staff>) => {
                    this.staff = res.body!;
                    this.staffForm.patchValue({
                      id: this.staff?.id,
                      firstName: this.staff?.firstName,
                      lastName: this.staff?.lastName,
                      mail: this.staff?.mail
                    });

                    console.log(true)

                  })
              }
            } else {
              console.log(false)
            }

          }
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );



    });

  }

  loadStaff(idComapgnie: number) {
    this.service.staffCompagnie(idComapgnie).subscribe(
      (res: HttpResponse<Staff[]>) => {
        this.staffs = res.body!;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  Update() {
    const updateForm = new Staff(
      this.staffForm.get('id')?.value,
      this.staffForm.get('mail')?.value,
      this.staffForm.get('firstName')?.value,
      this.staffForm.get('lastName')?.value,
      this.companie);

    if (this.staff?.id) {
      this.service.updateStaff(updateForm)
        .subscribe(
          () => {
            this.location.back();
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    } else {
      this.service.createStaff(updateForm)
        .subscribe(
          (res: HttpResponse<Staff>) => {
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    }
  }

  updateCC() {

    const updateCostCenter = new CostCenter(
      this.costCenterForm.get('id')?.value,
      this.costCenterForm.get('code')?.value,
      this.costCenterForm.get('label')?.value,
      this.costCenterForm.get('owner')?.value,
      this.companie);

    this.service.updateCostCenter(updateCostCenter).subscribe(
      (res: HttpResponse<CostCenter>) => {
        this.location.back();
      },
      (res: HttpErrorResponse) => console.log(res.message)
    )
  }

  updateOwner(email: string, isStaff: boolean){
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
