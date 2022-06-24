import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { User } from 'src/app/User/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users:any;
  tabUser: any = [];
  tabcc: any = [];
  searchKey: string = "";
  searchTerm: string = "";

  userForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    type: new FormControl('', [Validators.required]),
    costCenters: new FormControl('', Array)
  })
  constructor(
    private service: AccorService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.service.users()
      .subscribe(data => {
        this.tabUser = data;
        console.log(this.tabUser)
        for (let i = 0; i < this.tabUser.length; i++) {
          const arraycc = this.tabUser[i].costCenters;

          for (let ic = 0; ic < arraycc.length; ic++) {
            this.tabcc = arraycc[ic]; 
            
            console.log(arraycc[ic])
          }
          // //console.log(this.tabcc)
          // this.tabcc
        }

      })

    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })

  }

  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }
  
  NewUser(){
    this.router.navigate(["addUser"]);
  }

  remove(userId:any){
    this.service.deleteUser(userId)
     .subscribe( (data:any) =>{
       this.users = this.users?.filter((user: { id: any; }) => userId !== user.id);
         alert("deleted user");
         this.router.navigate(["UserList"]);
     })
  }

}
