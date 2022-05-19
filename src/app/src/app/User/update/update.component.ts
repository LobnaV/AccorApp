import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { User } from '../user';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  user: User = new User();

  userForm = new FormGroup({
    FirstName: new FormControl(''),
    LastName: new FormControl(''),
  });

  companyForm = new FormGroup({
    CompanyName: new FormControl('')
  })
  constructor(
    private router: Router,
    private service: AccorService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    const userId = this.route.snapshot.params['userId']

    this.service.getUserId(userId)
      .subscribe(
        (user: User) => {
          this.userForm.patchValue(user);
        }
      )

    const companyId = this.route.snapshot.params['companyId']

    // this.service.getCom



  }

  UpdateUserForm() {
    const updateFormUser = this.userForm.value;
    this.service.updateUser(updateFormUser)
      .subscribe(
        (user: User) => {
          console.log("update user done!");
          // this.router.navigate(['nom page'])
        }
      )
  }

  UpdateCompanyForm() {
    const updateFormCompany = this.companyForm.value;
    this.service.UpdateCompany(updateFormCompany)
      .subscribe(
        (company: any) => {
          console.log("Update company done!")
          //this.route.naviguate(['nom page'])
        }
      )
  }

}
