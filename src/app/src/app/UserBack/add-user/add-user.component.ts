import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { User } from 'src/app/User/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('', [Validators.required]),
   // costCenters: new FormControl('', Array)
  })
  constructor(
    private service: AccorService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  }


}
