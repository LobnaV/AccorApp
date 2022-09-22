import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccorService} from 'src/app/accor.service';
import {User} from '../../model/user';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Param} from "../../model/param";
import {Staff} from "../../model/staff";
import {ConfirmationDialogService} from "../confirmation-dialog/confirmation-dialog.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  searchKey: string = "";
  searchTerm: string = "";

  companie?: Param | null;
  tabUserGM?: User | null;
  staffs?: Staff[] | null = [];

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationDialogService: ConfirmationDialogService
  ) {
  }

  ngOnInit(): void {


    console.log('****');

    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.loadGM(params['id']);
      this.loadStaff(params['id']);
    });

    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })

  }

  loadGM(idCompagnie: number) {
    this.service.ParamId(idCompagnie).subscribe(
      (res: HttpResponse<Param>) => {
        console.log(res.body);
        this.companie = res.body;
        this.tabUserGM = this.companie?.userGM;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  loadStaff(idComapgnie: number) {
    this.service.staffCompagnie(idComapgnie).subscribe(
      (res: HttpResponse<Staff[]>) => {
        console.log(res.body);
        this.staffs = res.body;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
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
        console.log("update ok");
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

  NewUser() {
    this.router.navigate(["addUser/companie/", this.companie?.id]);
  }

  type() {
    for (let data of this.staffs!)
      if (this.tabUserGM?.username === this.companie?.dispacherMail) {
        return "Manger"
      } else if (data.mail === this.companie?.dispacherMail) {
        return "Head of Department"
      }
    return;
  }

  updateDispacher(email: string) {
    this.isLoading = true;
    this.service.updateDispatcher(this.companie?.id!, email).subscribe(
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
}



