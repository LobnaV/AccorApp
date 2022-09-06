import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  private _fb: any;
  form: any;
  type = 'Head of Department';
  spend_limit = 0;
  params:any;
  parameters: any;

  branch = [
    { name: "primaryBranch" }
  ];

  
  getDataGm = localStorage.getItem('getDataGm');
  getDataBranch = localStorage.getItem('getDataBranch');

  selectedCompanies = [];
  displayStyle = "none";


  user: User = new User();

  userForm = new FormGroup({
    selectCompany: new FormControl,
    primaryBranch: new FormControl,
   id: new FormControl(''), 
   firstName: new FormControl(''),
   lastName: new FormControl(''),
   username: new FormControl(''),
  })
  
  constructor(
    private service: AccorService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    
    this.getDataGm = this.getDataGm!.replace(/[""]/gi, '')
    this.getDataBranch = this.getDataBranch!.replace(/[""]/gi, '')

    const userId = this.route.snapshot.params['userId'];

    this.service.UserId(userId)
      .subscribe(
        (user:User) => {
          this.userForm.patchValue(user)
        }
      )

      this.service.getParams()
      .subscribe(data => {
        this.parameters = data;
        console.log('param',this.parameters)
      })
  }

  approvalLimit() {
    if (this.type === 'Head of Department') {
      return '0'
    } else {
      return false
    }
  }

  trueOrFalse(){
    if(this.userForm.value.primaryBranch == 'true'){
      return 'TRUE'
    }else{
      return 'FALSE'
    }
  }

  Update() {
    const updateForm = this.userForm.value;
    this.service.updateUsertest(updateForm)
      .subscribe(
       (user: User) => {
        console.log("update ok");
        this.router.navigate(["UserList"]);
      })

      const limit = this.approvalLimit();
      const branche = this.getDataBranch;
      const home = this.trueOrFalse();
      const gm = this.getDataGm;
  
      const data = [
        [branche, home, this.userForm.value.username, this.userForm.value.firstName, this.userForm.value.lastName, 'ACTIVE', gm, limit, this.spend_limit, 'Owned Cost Center','Head of Department']
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

}
