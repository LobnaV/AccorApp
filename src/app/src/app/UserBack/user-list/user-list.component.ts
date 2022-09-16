import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AccorService} from 'src/app/accor.service';
import {User} from '../../model/user';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Param} from "../../model/param";
import {Staff} from "../../model/staff";
import {CsvFormat} from "../../model/csv-format";
import * as moment from 'moment';
import {ConfirmationDialogService} from "../confirmation-dialog/confirmation-dialog.service";


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild("dispatcher") myNameElem!: ElementRef;
  val = localStorage.getItem('dispatcher');


  @Input() pdata: any;
  form: any;
  spend_limit = 0;
  params: any;
  parameters: any;
  branch = [
    {name: "primaryBranch"}
  ];
  users: any;
  tabcc: any = [];
  searchKey: string = "";
  searchTerm: string = "";
  displayStyle = "none";
  displayStyle2 = "none";
  displayHome = 'none';
  tableStyle = "table";
  dispatcher: any;
  t: any;
  tabi: any = [];
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
  role: any = [];
  roleName: string = "";
  isLoading = false;

  constructor(
    private service: AccorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public theDispatcher: AccorService,
    private confirmationDialogService: ConfirmationDialogService
  ) {
  }

  ngOnInit(): void {

    this.displayStyle = "none";

    console.log('****');

    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.service.ParamId(params['id']).subscribe(
        (res: HttpResponse<Param>) => {
          console.log(res.body);
          this.companie = res.body;
          this.tabUserGM = this.companie?.userGM;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
      this.loadStaff(params['id'])
    });

    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })

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
      .then((confirmed) =>
        this.confirmationDialogService.confirm('Confirmation', 'Can you confirm there are not more pending tasks in the task manager for this user? If no, please reassign the pending tasks before deleting the user.')
          .then(() => this.remove(idStaff))
          .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'))
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }


  remove(idStaff: number) {
    this.service.deleteStaff(idStaff).subscribe(
      () => {
        console.log("update ok");
        this.loadStaff(this.companie?.id!);
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  openPopup2() {

    this.displayStyle2 = "block"
    this.tableStyle = "none";
    this.displayStyle = "none";
  }

  back() {
    this.tableStyle = "table";
    this.displayStyle = "none";
    this.displayStyle2 = "none";
  }


  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }

  NewUser() {
    this.router.navigate(["addUser"]);
  }

  type() {
    for(let data of this.staffs!)
    if (this.tabUserGM?.username === this.companie?.dispacherMail ) {
      return "Manger"
    } else if(data.mail === this.companie?.dispacherMail) {
      return "Head of Department"
    }
    return ;
  }

  generateCsv(email: string, firstName: string, lastName: string, manager: string) {

    const type = this.type();
    let  approvalLimit = "";
    this.isLoading = true;
    let options = new CsvFormat(this.companie?.branch?.id?.toString(), 'TRUE', email, firstName, lastName, 'ACTIVE', manager, approvalLimit, '0', '', type);
    this.service.generateExcel(options, this.companie?.id!).subscribe(
      (response) => {
        if (response) {
          if (this.companie) {
            this.companie.dispacherMail = email;
          }
          const url = window.URL.createObjectURL(response?.body!);
          const a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = `Accortemplateuserssheet_${moment().format('DD_MM_YYYY_HH_mm')}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
          this.isLoading = false;
        }
      },
      (res: HttpErrorResponse) => {
        console.log(res.message);
        this.isLoading = false;
      }
    );
  }
}



