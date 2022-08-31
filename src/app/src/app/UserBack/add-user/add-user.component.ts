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


  userForm = new FormGroup({
    selectCompany: new FormControl,
    primaryBranch: new FormControl,
    type: new FormControl,
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    //password: new FormControl('', [Validators.required, Validators.minLength(10)]),

    
    // costCenters: new FormControl('', Array)
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
    this.service.getParams()
    .subscribe(data => {
      this.parameters = data;
      console.log('param',this.parameters)
    })

   // this.rolesParam
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

   testGM(){
    if(this.selectedCompanies.values  === this.parameters.hotel_MegaCode){
      console.log('test gm',  this.selectedCompanies)
      console.log('testX', this.parameters.hotel_MegaCode)
      console.log('test gm2', this.selectedCompanies.values  === this.parameters.hotel_MegaCode)

      //this.parameters?.filter((p: {hotel_MegaCode: any; p: any;}) => p.hotel_MegaCode === this.selectedCompanies.values)

      return this.parameters.general_manager
    }
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

  recupBranch() {
    console.log('branche', this.branch)
    return this.branch.filter(primary => true)
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
    const branche = this.recupBranch();
    const home = this.trueOrFalse();
    const gm = this.testGM();
    const role = this.role();

    const data = [
      [branche, home, this.userForm.value.email, this.userForm.value.firstName, this.userForm.value.lastName, 'ACTIVE', gm, limit, this.spend_limit, 'null',role]
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

