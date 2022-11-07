import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Branch } from 'src/app/model/branch';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-edit-manager',
  templateUrl: './edit-manager.component.html',
  styleUrls: ['./edit-manager.component.scss']
})
export class EditManagerComponent implements OnInit {
  
  branch?: Branch;
  user?:User;

  managerForm =  new FormGroup({
    id: new FormControl(''),
    userMGM: new FormGroup({
      id: new FormControl(''),
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    }),

  })

  constructor(
    private service: AccorService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      const idBranch = params['id'];
      this.service.branchId(idBranch).subscribe(
        (res: HttpResponse<Branch>) => {
          this.branch = res.body!;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );

      const idUser = params['id'];
     
    })

  }

  Update(){

   

  }

}
