import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { User } from '../../model/user';
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Param } from "../../model/param";
import { Staff } from "../../model/staff";
import { ConfirmationDialogService } from "../confirmation-dialog/confirmation-dialog.service";
import { CostCenter } from '../../model/costCenter';
import {Location} from "@angular/common";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {

  searchKey: string = "";
  searchTerm: string = "";

  companie?: Param | any;
  userGM?: User | null;
  staffs?: Staff[] | null = [];
  costcenters?: CostCenter[] = [];
  perimeter?: string;
  costcenter?: CostCenter;
  staff?: Staff;
  firstname?:string;
  lastname?:string;

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
    public location: Location
  ) {
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
        this.costcenters = res.body!;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    )
  }

  deleteStaff(idStaff: number) {
    this.confirmationDialogService.confirm('Confirmation', 'layouts.commons.messages.delete-user')
      .then((confirmed) => {
        if (confirmed) {
          this.confirmationDialogService.confirm('Confirmation', 'layouts.commons.messages.delete-user-confirmation')
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
    if (this.costcenters?.length) {
      this.service.cl(this.costcenters[0])
        .subscribe(
          res => {
            const url = window.URL.createObjectURL(res.body!);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            a.download = `Cost_center.csv`;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    }
  }

  save() {
    // let owner: any;
    // for (let i = 0; i < this.costcenters!.length; i++) {
    //   owner = this.costcenters[i]?.owner!;
    //
    //   while (owner == null) {
    //     this.confirmationDialogService.confirm('Error', 'There are still some errors in the cost centres assignments, please check and modify all errors before saving. A cost centre with an error means there is no user assigned. Please assign a user.')
    //       .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    //       break
    //   }
    // }
    // if(owner){
    //   this.uploadCodingList()
    //   console.log('no')
    // }
    this.uploadCodingList()
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



