import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ngxCsv} from 'ngx-csv';
import {AccorService} from 'src/app/accor.service';
import {User} from '../../model/user';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Param} from "../../model/param";
import {Staff} from "../../model/staff";
import {CsvFormat} from "../../model/csv-format";
import * as moment from 'moment';


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
    public theDispatcher: AccorService
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
      this.service.staffCompagnie(params['id']).subscribe(
        (res: HttpResponse<Staff[]>) => {
          console.log(res.body);
          this.staffs = res.body;
          
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );
    });

    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })

  }

  openPopup(idPop: any) {

    console.log('_______', idPop)
    this.displayStyle = "block"
    this.tableStyle = "none"

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

  trueOrFalseState() {
    if (this.userForm.value.primaryBranch == true) {
      return 'Delete'
    } else {
      return 'Remove'
    }
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


    let type = this.type();
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

  // csv(dispId: any) {
  //   const limit = this.approvalLimit();
  //   const branche = this.companie?.branch?.id;
  //   const home = this.trueOrFalseHome();
  //   const gm = this.companie?.userGM?.username;

  //   const data = [
  //     [branche, home, dispId.username, dispId.firstName, dispId.lastName, 'ACTIVE', gm, limit, this.spend_limit, dispId.selectCompany, 'Head of Department']
  //   ];
  //   console.log('test form', this._fb)

  //   let options = {
  //     fieldSeparator: ';',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     showTitle: false,
  //     useBom: true,
  //     headers: ['BranchId', 'HOME', 'Email', 'First Name', 'Last Name', 'State', 'Manager', 'Approval limit', 'Spend_limit', 'Owned Cost Center', 'User type']
  //   };
  //   console.log('dataFormtoCSV', data)

  //   new ngxCsv(data, "Accortemplateuserssheet", options)

  // }

  // csvdelete(dispId: any) {

  //   const limit = this.approvalLimit();
  //   const branche = this.companie?.branch?.id;
  //   const home = this.trueOrFalseHome();
  //   const gm = this.companie?.userGM?.username;
  //   const state = this.trueOrFalseState();
  //   // const disp = this.testDisp(dispId);

  //   const data = [
  //     [branche, home, dispId.username, dispId.firstName, dispId.lastName, state, gm, limit, this.spend_limit, '', 'Head of Department']
  //   ];

  //   console.log('test form', this._fb)

  //   let options = {
  //     fieldSeparator: ';',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     showTitle: false,
  //     useBom: true,
  //     headers: ['BranchId', 'HOME', 'Email', 'First Name', 'Last Name', 'State', 'Manager', 'Approval limit', 'Spend_limit', 'Owned Cost Center', 'User type']
  //   };
  //   console.log('dataFormtoCSV', data)

  //   new ngxCsv(data, "Accortemplateuserssheet", options)

  // }


  remove(userId: any) {
    if (confirm('Can you confirm there are not more pending tasks in the task manager for this user?  If no, please reassign the pending tasks before deleting the user')){
      this.service.deleteUser(userId)
        .subscribe(() => {
          this.users = this.users?.filter((user: { id: any; }) => userId !== user.id);
          alert("deleted user");
          window.location.reload()
          console.log('this.users', this.users)
        })
    }
  }
}



