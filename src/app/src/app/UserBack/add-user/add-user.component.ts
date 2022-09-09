import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { ParameterComponent } from 'src/app/Parameter/parameter/parameter.component';
import { User } from '../user';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  getDataHmc = localStorage.getItem('getDataHmc');
  getDataGm = localStorage.getItem('getDataGm');
  getDataBranch = localStorage.getItem('getDataBranch');


  userForm = new FormGroup({
    selectCompany: new FormControl,
    primaryBranch: new FormControl,
    type: new FormControl,
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.email]),
    //password: new FormControl('', [Validators.required, Validators.minLength(10)]),
  })

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

  constructor(
    private service: AccorService,
    private router: Router
  ) {}

  ngOnInit(): void {

    console.log('get',localStorage.getItem('getDataHmc'))
    this.getDataHmc = this.getDataHmc!.replace(/[""]/gi, '')
    this.getDataGm = this.getDataGm!.replace(/[""]/gi, '')
    this.getDataBranch = this.getDataBranch!.replace(/[""]/gi, '')



    this.service.getParams()
    .subscribe(data => {
      this.parameters = data;
      console.log('param',this.parameters)
    })


   // this.rolesParam
  }

  disable(data:any){
    var desired = this.getDataHmc!.replace(/[""]/gi, '')
    console.log(desired)

    console.log(data.selectCompany)
    if(desired == data.selectCompany){
      console.log('same')
    }
  }

  openForm() {
    this.displayStyle = "block"
   
  }


  ValueChange(event:any){
    console.log("selected value", event?.target.value,
    'all companies', this.parameters)
   }
  
   save(){
    console.log('value i got', this.selectedCompanies)
   // localStorage.setItem('dataSource', JSON.stringify(this.dataSource));
   // console.log(localStorage.getItem(this.dataSource))
   //console.log(localStorage.getItem( this.dataSource))
   }

  initModelForm(): FormGroup {
    return this._fb.group({
      otherControls: [''],
      // The formArray, empty 
      myChoices: new FormArray([]),
    })

  }

  onCheckboxChange(e: any) {
    const key: FormArray = this.form.get('key') as FormArray;
    console.log('key', key)

    if (e.target.checked) {
      localStorage.setItem('primaryBranch', this.userForm.value.chk.primaryBranch)
      return true;
    } else {
      localStorage.setItem('primaryBranch', this.userForm.value.chk.primaryBranch)
      return false
    }

  }

  approvalLimit() {
    if (this.type === 'Head of Department') {
      return '0'
    } else {
      return false
    }
  }

  trueOrFalse(){
    if(this.userForm.value.primaryBranch == true){
      return 'TRUE'
    }else{
      return 'FALSE'
    }
  }

  role(){
    if(this.userForm.value.type == true){
      return 'General Manger'
    }else{
      return this.type
    }
  }

  Ajouter() {

    const newUser = this.userForm.value;
    console.log(newUser)
    this.service.addUser(newUser)
      .subscribe(
        (user: User) => {
          alert("Add Successfully")
          this.router.navigate(["UserList"]);
        }
      )

    const limit = this.approvalLimit();
    const branche = this.getDataBranch;
    const home = this.trueOrFalse();
    const gm = this.getDataGm;
    const role = this.role();

    const data = [
      [branche, home, this.userForm.value.username, this.userForm.value.firstName, this.userForm.value.lastName, 'ACTIVE', gm, limit, this.spend_limit, '',role]
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

