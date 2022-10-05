import {HttpClient, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, map, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from './model/branch';
import { CostCenter } from './CostCenter/cost-center';
import { Param } from './model/param';
import { User } from './model/user';
import {Staff} from "./model/staff";

@Injectable({
  providedIn: 'root'
})
export class AccorService {
  private url = `${environment.UrlLocal}`
  private urlLocal = `${this.url}/User`
  private local = `${this.url}/Branch`;
  private paramUrl = `${this.url}/parameter`
  private staffUrl = `${this.url}/staff`
  private CCUrl = `${this.url}/CostCenter`

  public search = new BehaviorSubject<string>("");

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }

    // Service Parameter
  getParams(): Observable<HttpResponse<Param[]>> {
    return this.http
      .get<Param[]>(this.paramUrl + "/List", { observe: 'response' })
  }

  ParamId(id:number): Observable<HttpResponse<Param>> {
    return this.http
      .get<Param>(`${this.paramUrl}/${id}`, { observe: 'response' })
  }

  addParam(param:Param){
    return this.http
      .post<Param>(this.paramUrl + "/AddParameter/", param)
  }

  updateParam(param:Param): Observable<HttpResponse<Param>>{
    return this.http
      .put<Param>(this.paramUrl , param, { observe: 'response' });
  }

  deleteParam(paramId:Param){
    return this.http
      .delete<Param>(this.paramUrl + "/deleteParameter/" + paramId)
  }

  updateDispatcher(idCompagnie: number, email: string): Observable<HttpResponse<Param>> {
    return this.http.get<Param>(`${this.paramUrl}/${idCompagnie}/dispacher?email=${email}`, {
      observe: 'response',
    });
  }

  //staff

  staffCompagnie(id:number): Observable<HttpResponse<Staff[]>> {
    return this.http
      .get<Staff[]>(`${this.staffUrl}/compagnie/${id}`, { observe: 'response' })
  }

  staffId(id: number): Observable<HttpResponse<Staff>> {
    return this.http
      .get<Staff>(`${this.staffUrl}/${id}`, { observe: 'response' } )
  }

  updateStaff(staff:Staff): Observable<HttpResponse<Staff>> {
    return this.http
      .put<Staff>(this.staffUrl,  staff, { observe: 'response' });
  }


  deleteStaff(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.staffUrl}/${id}`, { observe: 'response' });
  }

  createStaff(staff:Staff): Observable<HttpResponse<Staff>>{
    return this.http
      .post<Staff>(this.staffUrl , staff, { observe: 'response' })
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

  updateUser(user:User): Observable<HttpResponse<User>> {
    return this.http.put<User>(`${this.urlLocal}`, user, { observe: 'response' });
  }

  updateUserName(user:User): Observable<HttpResponse<User>> {
    return this.http.put<User>(`${this.urlLocal}/name`, user, { observe: 'response' });
  }

  userId(id: number): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.urlLocal}/${id}`, { observe: 'response' })
  }

  deleteUser(userId:User){
    return this.http
      .delete<User>(this.urlLocal + "/delete/" + userId)
  }

  dispId(id:number){
    return this.http
      .get<User>(this.urlLocal + "/x/"+ id)
  }

  // branchId(id:number){
  //   return this.http
  //     .get<Branch>(this.local + "/"+ id)
  // }
  branchId(id:number) : Observable<HttpResponse<Branch>>{
    return this.http.get<Branch>(this.local + "/"+ id, { observe: 'response' })
  }

  companieBranch(id:number): Observable<HttpResponse<Param[]>>{
    return this.http.get<Param[]>(`${this.paramUrl}/branch/${id}`, { observe: 'response' })
  }


  branches(): Observable<HttpResponse<Branch[]>> {
    return this.http
      .get<Branch[]>(this.local + "/List", { observe: 'response' })
  }
  // branches(){
  //   return this.http
  //     .get<Branch[]>(this.local + "/List")
  // }

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

    logout() {
      localStorage.removeItem('TOKEN_APPLI');
      console.log('déconnecter');
      this.router.navigate(['/login']);
    }



}



