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

  selectedCompanies = [];
  displayStyle = "none";


  user: User = new User();

  userForm = new FormGroup({
    selectCompany: new FormControl,
    primaryBranch: new FormControl,
   id: new FormControl(''), 
   firstName: new FormControl(''),
   lastName: new FormControl(''),
   email: new FormControl(''),
  })
  
  constructor(
    private service: AccorService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

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

  testGM(){
    if(this.selectedCompanies.values  === this.parameters.hotel_MegaCode){
      console.log('test gm',  this.selectedCompanies)
      console.log('testX', this.parameters.hotel_MegaCode)
      console.log('test gm2', this.selectedCompanies.values  === this.parameters.hotel_MegaCode)

      //this.parameters?.filter((p: {hotel_MegaCode: any; p: any;}) => p.hotel_MegaCode === this.selectedCompanies.values)

      return this.parameters.hotel_MegaCode
    }
   }

  recupBranch() {
    console.log('branche', this.branch)
    return this.branch.filter(primary => true)
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
      const branche = this.recupBranch();
      const home = this.trueOrFalse();
      const gm = this.testGM();
  
      const data = [
        [branche, home, this.userForm.value.email, this.userForm.value.firstName, this.userForm.value.lastName, 'ACTIVE', gm, limit, this.spend_limit, 'Owned Cost Center','Head of Department']
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
