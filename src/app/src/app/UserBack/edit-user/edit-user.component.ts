import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { Staff } from 'src/app/model/staff';
import { User } from '../../model/user';
import { Location } from '@angular/common';

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


  selectedCompanies = [];
  displayStyle = "none";


  user: User = new User();

  userForm = new FormGroup({
    id: new FormControl(''),
    selectCompany: new FormControl,
    primaryBranch: new FormControl,
   firstName: new FormControl(''),
   lastName: new FormControl(''),
   username: new FormControl(''),
   mail: new FormControl(''),
   companyParameter: new FormControl(''),
  })

  constructor(
    private service: AccorService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {

    const userId = this.route.snapshot.params['userId'];
    const staffId = this.route.snapshot.params['staffId']

    // this.service.UserId(userId)
    //   .subscribe(
    //     (user:User) => {
    //       this.userForm.patchValue(user)
    //     }
    //   )

      this.service.staffId(staffId)
      .subscribe(
        (staff:Staff) => {
          this.userForm.patchValue(staff)
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

  back(){
    if(confirm("Are you sure you want to leave this page without saving your changes ? ")) {
      this.location.back()
    }
  }

  Update() {
    const updateForm = this.userForm.value;
    // this.service.updateUsertest(updateForm)
    //   .subscribe(
    //    (user: User) => {
    //     console.log("update ok");
    //     this.router.navigate(["UserList"]);
    //   })

      this.service.updateStaff(updateForm)
      .subscribe(
       (staff:Staff) => {
        console.log("update ok");
       this.location.back()
      })

  //     const limit = this.approvalLimit();
  //     const home = this.trueOrFalse();

  //     const data = [
  //       ['branche', home, this.userForm.value.username, this.userForm.value.firstName, this.userForm.value.lastName, 'ACTIVE', 'gm', limit, this.spend_limit, 'null','Head of Department']
  //     ];
  //     console.log('test form', this._fb)

  //     let options = {
  //       fieldSeparator: ';',
  //       quoteStrings: '"',
  //       decimalseparator: '.',
  //       showLabels: true,
  //       showTitle: false,
  //       useBom: true,
  //       headers: ['BranchId', 'HOME', 'Email', 'First Name', 'Last Name', 'State', 'Manager', 'Approval limit', 'Spend_limit', 'Owned Cost Center', 'User type']
  //     };
  //     console.log('dataFormtoCSV', data)

  //     new ngxCsv(data, "Accortemplateuserssheet", options)

   }

}
