import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';
import { User } from '../user';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('', [Validators.required]),
   // costCenters: new FormControl('', Array)
  })
  private _fb: any;
  form: any;

  initModelForm(): FormGroup{
    return this._fb.group({
      otherControls: [''],
      // The formArray, empty 
      myChoices: new FormArray([]),
    })
    
  }

    branch :any = [
    { name: "primaryBranch"}
  ];

  constructor(
    private service: AccorService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  onCheckboxChange(e:any){
    const key: FormArray = this.form.get('key') as FormArray;
    console.log('key', key)

    if (e.target.checked) {
      return true;
    }else{
      return false
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

      

  const data = [
    ['', this.form, this.userForm.value.email, this.userForm.value.firstName, this.userForm.value.lastName, 'ACTIVE', '',  this.userForm.value.type]
  ];
  console.log('test form',this. _fb)

    let options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers:['BranchId','Home', 'email','firstName','lastName', 'State','Manager', 'type']
    };
    console.log('dataFormtoCSV', data)

    new ngxCsv (data, "Accortemplateuserssheet",options )
  
  }
}

