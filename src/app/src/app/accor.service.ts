import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TestAccor } from './TestAccor';
import { User } from './User/user';

@Injectable({
  providedIn: 'root'
})
export class AccorService {
  private userInfo = `${environment.BaseUrl}/account/info/user`;
  private userById = `${environment.BaseUrl}/account/users`;
  private findUsers = `${environment.BaseUrl}/account`;
  private companyAccountId = `${environment.BaseUrl}/account`;
  private allCompagnies = `${environment.BaseUrl}/network/companies`;
  private testA: string = '../assets/TestAccor.json';

  public search = new BehaviorSubject<string>("");

  constructor(
    private http:HttpClient,
    ) { }

    getUserInfo(){
      return this.http
        .get<User[]>(this.userInfo);
    }

    getUserId(userId:number){
      return this.http
        .get<User>(this.userById + "/" + userId);
    }

    updateUser(user:User){
      return this.http
        .put<User>(this.userById + "/" + user.UserId, user);
    }

    getUsersByCompanyID(companyId:number){
      return this.http
        .get<User[]>(this.findUsers + "/" + companyId + "/users" )
    }

    getAllCompagnies(){
     return this.http
        .get<any>(this.allCompagnies)
    }

    getCompanyOfUser(id:number){
      return this.http
        .get<User>(this.companyAccountId + "/" + id)

    }

    UpdateCompany(user:User){
      return this.http
        .put<User>(this.companyAccountId + "/" + user.Id, user)
        //modifier le user.Id si pas le bon a recuperer
    }
    //CompanyAccountId => /{companyId}

    // createBranch(){
    //   //Url >  /tradeshift/rest/external/account/branches/new
    // }

  getDonneeJson(): Observable<TestAccor[]>{
    return this.http.get<TestAccor[]>(this.testA)

  }

}



