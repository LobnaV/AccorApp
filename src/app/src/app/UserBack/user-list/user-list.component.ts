import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { User } from '../user';
import { Location } from '@angular/common'
import { checkServerIdentity } from 'tls';
import { Console } from 'console';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild("dispatcher") myNameElem!: ElementRef;
  val = localStorage.getItem('dispatcher');

  
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
  
  users: any;
  // tabUser: User[] = [];
  tabUsersGM: User[] = [];
  tabUsersOther: User[] = [];
  tabcc: any = [];
  searchKey: string = "";
  searchTerm: string = "";
  
  displayStyle = "none";
  displayStyle2 = "none";
  displayHome = 'none';
  tableStyle = "table";
  
  dispatcher :any;
  t:any;
  tabi : any = [];

  companie?: any;

  userForm = new FormGroup({
    selectCompany: new FormControl,
    primaryBranch: new FormControl,
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })

  idPop:any;

  role:any =[];
  roleName:string ="";

  constructor(
    private service: AccorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public theDispatcher: AccorService
  ) { }

  ngOnInit(): void {

    this.displayStyle = "none";

    console.log('****');

    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.service.ParamId(params['id']).subscribe(data => {
        this.companie = data;
        console.log(data);
      });
    });

    

   this.service.users()
      .subscribe((data: User[]) => {
        console.log(data)
        for (let user of data) {
          if (user.roles?.map(role => role.name).includes('ROLE_GM')) {
            this.tabUsersGM.push(user);
          } else {
            this.tabUsersOther.push(user);
          }
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

      this.trueOrFalseHome
      this.roleName
      //console.log(this.roleName)

}






  trueOrFalseDispatcher() {
    if (document.getElementById('dispatcher') ) {
      localStorage.setItem('dispatcher', JSON.stringify(this.dispatcher))
      console.log(this.dispatcher)
      return true
    } else {
      return false
    }
  }



  testDisp(dispId: any) {
          if(this.trueOrFalseDispatcher() == true){ 
            console.log(document.getElementById('radioCheck')!.ariaChecked )
            //document.getElementById('radioCheck')!.ariaChecked = localStorage.getItem("radio"); 
            return dispId.selectCompany;
          } else {
            return 'null'
          }         
  }

  save(data:any){
    if(data != undefined){
      localStorage.setItem('getDataDisp', JSON.stringify(data))
    }
    console.log(data)

  }

  disable(data:any){
    var desired = this.companie.hotel_MegaCode.replace(/[""]/gi, '')
    console.log(desired)
    
    console.log(data.selectCompany)
    if(desired == data.selectCompany){
      console.log('same')
    }
  }

   openPopup(idPop:any) {

    console.log('_______',idPop)
   this.displayStyle = "block"
   this.tableStyle = "none"

   }

  openPopup2() {

   this.displayStyle2 = "block"
      this.tableStyle = "none";
      this.displayStyle = "none"  
  }
  
  back() {
      this.tableStyle = "table";;
      this.displayStyle = "none"
      this.displayStyle2 = "none"
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


  trueOrFalseHome() {
    if (this.userForm.value.primaryBranch == true) {
      console.log(this.userForm.value.primaryBranch)
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
      const branche = this.companie.BranchId;
      const home = this.trueOrFalseHome();
      const gm= this.companie.general_manager;
      //const disp = this.testDisp(dispId);

      const data = [
        [branche, home, dispId.username, dispId.firstName, dispId.lastName, 'ACTIVE', gm, limit, this.spend_limit, dispId.selectCompany, 'Head of Department']
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
    const branche = this.companie.BranchId;
    const home = this.trueOrFalseHome();
    const gm = this.companie.general_manager;
    const state = this.trueOrFalseState();
   // const disp = this.testDisp(dispId);

    const data = [
      [branche,home , dispId.username, dispId.firstName, dispId.lastName, state, gm, limit, this.spend_limit, '', 'Head of Department']
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
    // if(confirm('Continue with deletion'))
     if(confirm('Yes I confirm, and I want to delete the user'))
    this.service.deleteUser(userId)
      .subscribe((data: any) => {
        this.users = this.users?.filter((user: { id: any; }) => userId !== user.id);
        alert("deleted user");
        window.location.reload()
        console.log('this.users', this.users)
      })
   }
}



