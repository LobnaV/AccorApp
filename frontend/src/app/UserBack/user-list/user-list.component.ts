import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { User } from '../../model/user';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Param } from "../../model/param";
import { Staff } from "../../model/staff";
import { ConfirmationDialogService } from "../confirmation-dialog/confirmation-dialog.service";
import { TranslateService } from '@ngx-translate/core';
import { CostCenter } from '../../model/costCenter';
import {Location} from "@angular/common";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  searchKey: string = "";
  searchTerm: string = "";

  companie?: Param | any;
  userGM?: User | null;
  staffs?: Staff[] | null = [];
  costcenters?: CostCenter[] | any = [];
  perimeter?: string;
  costcenter?: CostCenter;
  staff?: Staff;
  firstname?:string;
  lastname?:string;
  message1;
  message1part2;
  message2;

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



  userForm = new FormGroup({
    selectCompany: new FormControl,
    primaryBranch: new FormControl,
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  isLoading = false;

  constructor(
    private service: AccorService,
    private activatedRoute: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService,
    public location: Location,
    public translate: TranslateService
  ) {
    this.message1 = this.translate.instant('DELETE.MESSAGE3');
    this.message1part2 = this.translate.instant('DELETE.MESSAGE3PART2');
    this.message2 = this.translate.instant('DELETE.MESSAGE4');


  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.loadGM(params['id']);
      this.loadStaff(params['id']);
      this.loadCostCenter(params['id']);

    });

    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })


    for (let i = 0; i < this.staffs!.length; i++) {
      console.log(this.staffs)
      const element = this.staffs![i].mail;
      const elementId = this.staffs![i].id
      this.firstname = this.staffs![i].firstName
      this.lastname = this.staffs![i].lastName
      console.log(this.firstname)
      console.log(this.lastname)
      console.log(elementId)
      console.log(this.costcenter?.owner)

      if (this.costcenter?.owner === element!) {

        this.firstname = this.staffs![i].firstName
        this.lastname = this.staffs![i].lastName

      }
    }
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

  //Switch language
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }

  loadStaff(idComapgnie: number) {
    this.service.staffCompagnie(idComapgnie).subscribe(
      (res: HttpResponse<Staff[]>) => {
        this.staffs = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  loadCostCenter(idCompagnie: number) {
    this.service.CostCenterCompany(idCompagnie).subscribe(
      (res: HttpResponse<CostCenter[]>) => {
        this.costcenters = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    )
  }

  deleteStaff(idStaff: number) {
    this.confirmationDialogService.confirm('Confirmation', this.message1 +'\n'+ this.message1part2)
      .then((confirmed) => {
        if (confirmed) {
          this.confirmationDialogService.confirm('Confirmation', this.message2)
            .then(() => {
              if (confirmed) {
                this.remove(idStaff);
              }
            })
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
        }
      }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }

  remove(idStaff: number) {
    this.service.deleteStaff(idStaff).subscribe(
      () => {
        this.loadStaff(this.companie?.id!);
        this.loadGM(this.companie?.id!);
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }

  type() {
    for (let data of this.staffs!)
      if (this.userGM?.username === this.companie?.dispacherMail) {
        return "Manager"
      } else if (data.mail === this.companie?.dispacherMail) {
        return "Head of Department"
      }
    return;
  }

  updateDispacher(email: string, isStaff: boolean) {
    this.isLoading = true;
    this.service.updateDispatcher(this.companie?.id!, email, isStaff).subscribe(
      (response: HttpResponse<Param>) => {
        this.companie = response.body!;
        this.isLoading = false;
      },
      (res: HttpErrorResponse) => {
        console.log(res.message);
        this.isLoading = false;
      }
    );
  }

  uploadCodingList() {
    const updateForm = new CostCenter(
      this.costCenterForm.get('id')?.value,
      this.costCenterForm.get('code')?.value,
      this.costCenterForm.get('label')?.value,
      this.costCenterForm.get('owner')?.value,
      this.companie);

    this.service.cl(updateForm)
      .subscribe(
        (res: HttpResponse<CostCenter>) => {
          console.log('ok')
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
  }

  save() {
    let owner: any;
    for (let i = 0; i < this.costcenters!.length; i++) {
      owner = this.costcenters[i].owner;

      console.log(owner)

      while (owner == null) {
        this.confirmationDialogService.confirm('Error', 'There are still some errors in the cost centres assignments, please check and modify all errors before saving. A cost centre with an error means there is no user assigned. Please assign a user.')
          .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
          break
      }
    }
    if(owner){
      this.uploadCodingList()
      console.log('no')
    }
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

  back() {
    this.location.back()
  }

}



