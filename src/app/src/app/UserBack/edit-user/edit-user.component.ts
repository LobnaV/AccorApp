import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { User } from 'src/app/User/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: User = new User();

  userForm = new FormGroup({
   id: new FormControl(''), 
   name: new FormControl(''),
   email: new FormControl(''),
   type: new FormControl(''),
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
  }

  Update() {
    const updateForm = this.userForm.value;
    this.service.updateUsertest(updateForm)
      .subscribe(
       (user: User) => {
        console.log("update ok");
        this.router.navigate(["UserList"]);
      })
  }

}
