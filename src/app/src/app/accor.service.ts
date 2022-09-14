import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from './Branch/branch';
import { CostCenter } from './CostCenter/cost-center';
import { Param } from './Parameter/param';
import { User } from './UserBack/user';

@Injectable({
  providedIn: 'root'
})
export class AccorService {
  private url = `${environment.UrlLocal}`
  private urlLocal = `${environment.UrlLocal}/User`
  private local = `${environment.UrlLocal}/Branch`;
  private paramUrl = `${environment.UrlLocal}/Parameter`
  private CCUrl = `${environment.UrlLocal}/CostCenter`



  public search = new BehaviorSubject<string>("");

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }

    // Service Parameter
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

  // Service User


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

  dispId(id:number){  
    return this.http
      .get<User>(this.urlLocal + "/x/"+ id)
  }

  branchId(id:number){  
    return this.http
      .get<Branch>(this.local + "/"+ id)
  }

  branches(){
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

  
  /**
   * méthode qui pérmet de s'enregistrer
   * @param newUser
   */
   register(newUser: User) {
    return this.http.post(`${this.url}/auth/signin`, newUser)
  }

  /**
   * méthode qui permet de se logger et de save le token en localStorage
   * @param user
   */
   login(user:User){
    return this.http.post(`${this.url}/auth/login`,user)
      .pipe(
        map(
          (resp:any)=>{
            localStorage.setItem('TOKEN_APPLI', resp.token);
            console.log('token Save');
            localStorage.setItem('User_Email', JSON.stringify(user.username))
            console.log(user)
            return resp;
          }
        )
      );
  }

    /**
   * méthode qui récupère le token du localStorage
   */
     getToken(){
      return localStorage.getItem("TOKEN_APPLI");
    }
  
    logout() {
      localStorage.removeItem('TOKEN_APPLI');
      localStorage.removeItem('User_Email');
      localStorage.removeItem('getDataHmc');
      localStorage.removeItem('getDataHn');
      localStorage.removeItem('getDataGm');
      localStorage.removeItem('getDataBranch');
      localStorage.removeItem('getDataBranchName')
      console.log('déconnecter');
      this.router.navigate(['/login']);
    }


  
}



