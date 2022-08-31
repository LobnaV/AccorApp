import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { User } from '../user';
import { Location } from '@angular/common'


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild("dispatcher") myNameElem!: ElementRef;
  val = localStorage.getItem("dispatcher");

  @Input() pdata:any;

  private _fb: any;
  form: any;
  type = 'Head of Department';
  spend_limit = 0;
  params: any;
  parameters: any;

  branch = [
    { name: "primaryBranch" }
  ];

  selectedCompanies = [];

  users: any;
  tabUser: any = [];
  tabcc: any = [];
  searchKey: string = "";
  searchTerm: string = "";

  displayStyle = "none";
  displayStyle2 = "none";
  displayHome = 'none';
  tableStyle = "block";

  dispatcher = true;
  t:any;
  tabi : any = [];

  userForm = new FormGroup({
    selectCompany: new FormControl,
    primaryBranch: new FormControl,
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  idPop:any;

  constructor(
    private service: AccorService,
    private router: Router,
    private location:Location,
    public theDispatcher: AccorService
  ) { }

  ngOnInit(): void {

    console.log(this.pdata)

    console.log('val', this.val)
    this.service.users()
      .subscribe(data => {
        this.tabUser = data;
        console.log(this.tabUser)
        for (let i = 0; i < this.tabUser.length; i++) {
          this.tabi = this.tabUser[i];

          // const arraycc = this.tabUser[i].costCenters;
          // for (let ic = 0; ic < arraycc.length; ic++) {
          //   this.tabcc = arraycc[ic];

          //   console.log(arraycc[ic])
          // }
          
          // //console.log(this.tabcc)
          // this.tabcc
          this.t = this.tabUser[i].selectCompany
          //console.log(this.t)
        }
      })

    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })

    this.service.getParams()
      .subscribe(data => {
        this.parameters = data;
        console.log('param', this.parameters)
      })
  }

  testDisp(dispId: any) {
    console.log(dispId)
          if (document.getElementById('radioCheck')!.ariaChecked) {
            console.log(document.getElementById('radioCheck')!.ariaChecked )
            return;
          } else {
            return 'null'
          }    
  }



   openPopup(idPop:any) {

    console.log('_______',idPop)
   this.displayStyle = "block"
   this.tableStyle = "none"
  
   }

 

  openPopup2() {

    if (this.displayStyle2 = "block") {
      this.tableStyle = "none";
      this.displayStyle = "none"
    } else if (this.displayStyle2 = "block") {
      this.tableStyle = "block";
    }
  }
  
  back() {
      this.tableStyle = "block";
      this.displayStyle = "none"

  }


  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }

  NewUser() {
    this.router.navigate(["addUser"]);
  }

  approvalLimit() {
    if (this.type === 'Head of Department') {
      return '0'
    } else {
      return false
    }
  }

  testGM() {
    if (this.selectedCompanies.values === this.parameters.hotel_MegaCode) {
      console.log('test gm', this.selectedCompanies)
      console.log('testX', this.parameters.hotel_MegaCode)
      console.log('test gm2', this.selectedCompanies.values === this.parameters.hotel_MegaCode)

      //this.parameters?.filter((p: {hotel_MegaCode: any; p: any;}) => p.hotel_MegaCode === this.selectedCompanies.values)

      return this.parameters.hotel_MegaCode
    }
  }

  recupBranch() {
    console.log('branche', this.branch)
    return this.branch.filter(primary => true)
  }

  trueOrFalseDispatcher() {
    if (this.dispatcher == true) {
      console.log(this.dispatcher)
      return 'dispatcher'
    } else {
      return false
    }
  }

  trueOrFalseHome() {
    if (this.userForm.value.primaryBranch == 'true') {
      return 'TRUE'
    } else {
      return 'FALSE'
    }
  }

  trueOrFalseState() {
    if (this.userForm.value.primaryBranch == true) {
      return 'Delete'
    } else {
      return 'Remove'
    }
  }

  csv(dispId: any) {
      const limit = this.approvalLimit();
      const branche = this.recupBranch();
      const home = this.trueOrFalseHome();
      const gm = this.testGM();
      const disp = this.testDisp(dispId);

      const data = [
        [branche, home, dispId.email, dispId.firstName, dispId.lastName, 'ACTIVE', gm, limit, this.spend_limit, dispId.selectCompany, 'Head of Department']
      ];
      console.log('test form', this._fb)

      let options = {
        fieldSeparator: ';',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: false,
        useBom: true,
        headers: ['BranchId', 'HOME', 'Email', 'First Name', 'Last Name', 'State', 'Manager', 'Approval limit', 'Spend_limit', 'Owned Cost Center', 'User type']
      };
      console.log('dataFormtoCSV', data)

      new ngxCsv(data, "Accortemplateuserssheet", options)
    
  }

  csvdelete(dispId: any) {
    const limit = this.approvalLimit();
    const branche = this.recupBranch();
    const home = this.trueOrFalseHome();
    const gm = this.testGM();
    const state = this.trueOrFalseState();
    const disp = this.testDisp(dispId);

    const data = [
      [branche, home, dispId.email, dispId.firstName, dispId.lastName, state, gm, limit, this.spend_limit, dispId.selectCompany, 'Head of Department']
    ];
    console.log('test form', this._fb)

    let options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: ['BranchId', 'HOME', 'Email', 'First Name', 'Last Name', 'State', 'Manager', 'Approval limit', 'Spend_limit', 'Owned Cost Center', 'User type']
    };
    console.log('dataFormtoCSV', data)

    new ngxCsv(data, "Accortemplateuserssheet", options)
  
}


  remove(userId: any) {
    this.service.deleteUser(userId)
      .subscribe((data: any) => {
        this.users = this.users?.filter((user: { id: any; }) => userId !== user.id);
        alert("deleted user");
        window.location.reload()
        console.log('this.users', this.users)
      })



  //   const limit = this.approvalLimit();
  //   const branche = this.recupBranch();
  //   const home = this.trueOrFalseHome();
  //   const state = this.trueOrFalseState();
  //   const gm = this.testGM();
  //   const disp = this.testDisp(dispId);

  //   const data = [
  //     [branche, home, this.users, this.userForm.value.firstName, this.userForm.value.lastName, state, gm, limit, this.spend_limit, disp , 'Head of Department']
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

   }
}



