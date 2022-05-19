import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccorService } from 'src/app/accor.service';
import { environment } from 'src/environments/environment';
import { User } from '../user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private userInfo = `${environment.BaseUrl}/account/info/user`;
  private listAccount = `${environment.BaseUrl}/account`;
  private listBranch = `${environment.BaseUrl}/account/branches`;
  private updateRole = `${environment.BaseUrl}/account/users/{userId}/role`;
  users?: User[];
  companies?: any;

  constructor(
    private http: HttpClient,
    private service: AccorService
  ) { }

  ngOnInit(): void {

    // this.getUserInfo();*
    // this.getInfoUser();
    // this.getAccount();
    // this.getBranchs();

  }
  /** methodes User */
  // getUserInfo(){
  //   this.http.get<any>(this.userInfo)
  //   .subscribe(response =>{
  //     this.userInfo = response;
  //   })
  //   console.log('test user info ' + this.userInfo)
  // }

  /**avec service*/

  getUserInfoS() {
    this.service.getUserInfo()
      .subscribe(data => {
        this.users = data;
        console.log(this.users)
      })
  }
    
  getUserRole(){
    this.service.getUserInfo()
      .subscribe(data => {
        this.users = data;
      console.log(this.users[0].MemberShips)
      // a verifier
        
      })
    
  }

  // getUsersCompanyId(){
  //   this.service.getUsersByCompanyID(companyId)
  //     .subscribe(data =>{
  //       this.users=data;
  //     })
  // }

  allCompagnies() {
    this.service.getAllCompagnies()
      .subscribe(data =>{
        this.companies = data;
        console.log(this.companies)
      })
  }



  getAccount() {
    this.http.get<any>(this.listAccount)
      .subscribe(response => {
        this.listAccount = response;
      })
    console.log('test account ' + this.listAccount)
  }

  getBranchs() {
    this.http.get<any>(this.listBranch)
      .subscribe(response => {
        this.listBranch = response;
      })
    console.log('test branchs ' + this.listBranch)
  }

  UpdateUserRole(userId: any) {
    this.http.put(this.updateRole + userId, userId)
      .subscribe(response => {
        //this.updateRole = response;
        console.log('test update role' + this.updateRole)
      })
  }

}
