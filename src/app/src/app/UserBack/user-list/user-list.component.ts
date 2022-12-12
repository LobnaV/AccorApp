import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccorService} from 'src/app/accor.service';
import {User} from '../../model/user';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Param} from "../../model/param";
import {Staff} from "../../model/staff";
import {ConfirmationDialogService} from "../confirmation-dialog/confirmation-dialog.service";
import { TranslateService } from '@ngx-translate/core';
import { CostCenter } from '../../model/costCenter';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  searchKey: string = "";
  searchTerm: string = "";

  companie?: Param | null;
  userGM?: User | null;
  staffs?: Staff[] | null = [];
  costcenters?: CostCenter[] | any = [];
  perimeter?:string;
  costcenter?: CostCenter;
  staff?: Staff;

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
    public translate: TranslateService

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


    for (let i = 0; i < this.staffs!.length; i++) {
      console.log(this.staffs)
      const element = this.staffs![i].mail;
      const elementId = this.staffs![i].id
      console.log(elementId)
      console.log(this.costcenter?.owner)

      if (this.costcenter?.owner === element!) {

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

  loadCostCenter(idCompagnie: number){
    this.service.CostCenterCompany(idCompagnie).subscribe(
      (res: HttpResponse<CostCenter[]>) => {
        this.costcenters = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    )
  }

  deleteStaff(idStaff: number) {
    this.confirmationDialogService.confirm('Confirmation', 'If you need to temporarily delete a user, we advise you use the delegation rule option within\n' +
      '    Tradeshift (holiday, maternity leave, sick leave) to temporarily delegate tasks to another colleague.')
      .then((confirmed) => {
          if (confirmed) {
            this.confirmationDialogService.confirm('Confirmation', 'Can you confirm there are not more pending tasks in the task manager for this user? If no, please reassign the pending tasks before deleting the user.')
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

  save(){
    const updateForm = new CostCenter(
      this.costCenterForm.get('id')?.value,
      this.costCenterForm.get('code')?.value,
      this.costCenterForm.get('label')?.value,
      this.costCenterForm.get('owner')?.value);

    this.service.cl(updateForm)
    .subscribe(
      (res: HttpResponse<CostCenter>) => {
        console.log('ok')
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
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



