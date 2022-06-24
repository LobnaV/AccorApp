import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from './Branch/branch';
import { Company } from './Company/company';
import { CostCenter } from './CostCenter/cost-center';
import { Param } from './Parameter/param';
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
  private urlLocal = `${environment.UrlLocal}/User`
  private local = `${environment.UrlLocal}/Branch`;
  private paramUrl = `${environment.UrlLocal}/Parameter`
  private companyUrl = `${environment.UrlLocal}/Company`
  private CCUrl = `${environment.UrlLocal}/CostCenter`



  public search = new BehaviorSubject<string>("");

  constructor(
    private http:HttpClient,
    ) { }

    //________________Service back ______________________

  getParams(){
    return this.http
      .get<Param[]>(this.paramUrl + "/List")
  }

  addParam(param:Param){
    return this.http
      .post<Param>(this.paramUrl + "/AddParameter/", param)
  }

  ParamId(id:number){
    return this.http
      .get<Param>(this.paramUrl + "/" + id)
  }
  
  updateParam(param:Param){
    return this.http
      .put<Param>(this.paramUrl + "/editParameter/" + param.id, param);
  }

  deleteParam(paramId:Param){
    return this.http
      .delete<Param>(this.paramUrl + "/deleteParameter/" + paramId)
  }

  getCompanies(){
    return this.http
      .get<Company[]>(this.companyUrl + "/ListCompany")
  }

  getCompanyId(hotel_MegaCode:string){
    return this.http
      .get<Company>(this.companyUrl + "/" + hotel_MegaCode)
  }

  addCompany(company:Company){
    return this.http
      .post<Company>(this.companyUrl + "/AddCompany/", company)
  }

  UpdateCompany(company:Company){
    return this.http
      .put<Company>(this.companyUrl + "/editCompany/"+ company.hotel_MegaCode, company)
  }

  deleteCompany(companyId:Company){
    return this.http
      .delete<Company>(this.companyUrl + "/deleteCompany/" + companyId)
  }

  users(){
    return this.http
      .get<User[]>(this.urlLocal + "/List")
  }

  addUser(user:User){
    return this.http
      .post<User>(this.urlLocal + "/AddUser/", user)
  }

  updateUsertest(user:User){
    return this.http
      .put<User>(this.urlLocal + "/edit/" + user.id, user);
  }

  UserId(id: number){
    return this.http
      .get<User>(this.urlLocal + "/" + id)
  }

  deleteUser(userId:User){
    return this.http
      .delete<User>(this.urlLocal + "/delete/" + userId)
  }

  branchs(){
    return this.http
      .get<Branch[]>(this.local + "/List")
  }

  addBranch(branch:Branch){
    return this.http
      .post<Branch>(this.local + "/AddBranch/", branch)
  }

  costCenterList(){
    return this.http
      .get<CostCenter[]>(this.CCUrl + "/List")
  }

  addcostCenter(costCenter:CostCenter){
    return this.http
      .post<CostCenter>(this.CCUrl + "/AddCostCenter/", costCenter)
  }

  CostCenterId(megaCode_CostCenter_ID: string){
    return this.http
      .get<CostCenter>(this.CCUrl + "/" + megaCode_CostCenter_ID)
  }

  updateCostCenter(costCenter:CostCenter){
    return this.http
      .put<CostCenter>(this.CCUrl + "/editCostCenter/" + costCenter.megaCode_CostCenter_ID, costCenter);
  }

  deleteCC(ccId:CostCenter){
    return this.http
      .delete<CostCenter>(this.CCUrl + "/deleteCostCenter/" + ccId)
  }






//_______________Tradshift API________________________

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

    // UpdateCompany(user:User){
    //   return this.http
    //     .put<User>(this.companyAccountId + "/" + user.Id, user)
    //     //modifier le user.Id si pas le bon a recuperer
    // }
    //CompanyAccountId => /{companyId}

    // createBranch(){
    //   //Url >  /tradeshift/rest/external/account/branches/new
    // }

  getDonneeJson(): Observable<TestAccor[]>{
    return this.http.get<TestAccor[]>(this.testA)

  }

  
}



