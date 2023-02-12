import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from './model/branch';
import { CostCenter } from './model/costCenter';
import { Param } from './model/param';
import { User } from './model/user';
import { Staff } from './model/staff';
import { Category } from "./model/category";
import {Oauth2Service} from "./Account/tradeshift/oauth2.service";

@Injectable({
  providedIn: 'root'
})
export class AccorService {
  public search = new BehaviorSubject<string>('');
  private url = `${environment.UrlLocal}`;
  private urlLocal = `${this.url}/User`;
  private local = `${this.url}/Branch`;
  private paramUrl = `${this.url}/parameter`;
  private staffUrl = `${this.url}/staff`;
  private CCUrl = `${this.url}/CostCenter`;
  private categorieUrl = `${this.url}/categories`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private oAuthTsService: Oauth2Service
  ) {
  }

  // Service Parameter
  getParams(): Observable<HttpResponse<Param[]>> {
    return this.http
      .get<Param[]>(this.paramUrl + '/List', {observe: 'response'})
  }

  getCategories(): Observable<HttpResponse<Category[]>> {
    return this.http
      .get<Category[]>(this.categorieUrl, {observe: 'response'})
  }

  ParamId(id: number): Observable<HttpResponse<Param>> {
    return this.http
      .get<Param>(`${this.paramUrl}/${id}`, {observe: 'response'})
  }

  companieBranch(id: number): Observable<HttpResponse<Param[]>> {
    return this.http
      .get<Param[]>(`${this.paramUrl}/branch/${id}`, {observe: 'response'})
  }

  addParam(param: Param): Observable<HttpResponse<Param>> {
    const accessTokenTs = this.oAuthTsService.getToken();
    const headers = new HttpHeaders({
      'Ts_Access_Token': accessTokenTs
    });
    return this.http
      .post<Param>(this.paramUrl, param, {observe: 'response', headers})
      .pipe(catchError(error => throwError(error)));
  }

  updateParam(param: Param): Observable<HttpResponse<Param>> {
    const accessTokenTs = this.oAuthTsService.getToken();
    const headers = new HttpHeaders({
      'Ts_Access_Token': accessTokenTs
    });
    return this.http
      .put<Param>(this.paramUrl, param, {observe: 'response', headers})
      .pipe(catchError(error => throwError(error)));
  }

  deleteParam(paramId: Param) {
    return this.http.delete<Param>(this.paramUrl + '/' + paramId, {observe: 'response'});
  }

  updateDispatcher(idCompagnie: number, email: string, isStaff: boolean): Observable<HttpResponse<Param>> {
    const accessTokenTs = this.oAuthTsService.getToken();
    const headers = new HttpHeaders({
      'Ts_Access_Token': accessTokenTs
    });
    return this.http.get<Param>(`${this.paramUrl}/${idCompagnie}/dispacher?email=${encodeURIComponent(email)}&isStaff=${isStaff}`, {
      observe: 'response',
      headers
    });
  }

  //staff

  staffCompagnie(id: number): Observable<HttpResponse<Staff[]>> {
    return this.http
      .get<Staff[]>(`${this.staffUrl}/compagnie/${id}`, {observe: 'response'})
  }

  staffId(id: number): Observable<HttpResponse<Staff>> {
    return this.http
      .get<Staff>(`${this.staffUrl}/${id}`, {observe: 'response'})
  }

  updateStaff(staff: Staff): Observable<HttpResponse<Staff>> {
    const accessTokenTs = this.oAuthTsService.getToken();
    const headers = new HttpHeaders({
      'Ts_Access_Token': accessTokenTs
    });
    console.log(headers.get('Ts_Access_Token'));
    return this.http
      .put<Staff>(this.staffUrl, staff, { observe: 'response', headers });
  }

  updateManager(staff: Staff): Observable<HttpResponse<Staff>> {
    return this.http
      .put<Staff>(`${this.staffUrl}/test`, staff, {observe: 'response'});
  }


  deleteStaff(id: number): Observable<HttpResponse<void>> {
    const accessTokenTs = this.oAuthTsService.getToken();
    const headers = new HttpHeaders({
      'Ts_Access_Token': accessTokenTs
    });
    return this.http.delete<void>(`${this.staffUrl}/${id}`, {observe: 'response', headers});
  }

  createStaff(staff: Staff): Observable<HttpResponse<Staff>> {
    const accessTokenTs = this.oAuthTsService.getToken();
    const headers = new HttpHeaders({
      'Ts_Access_Token': accessTokenTs
    });
    return this.http
      .post<Staff>(this.staffUrl, staff, {observe: 'response', headers})
  }

  // Service User


  addUser(user: User): Observable<HttpResponse<User>> {
    return this.http
      .post<User>(`${this.urlLocal}`, user, {observe: 'response'});
  }

  updateUser(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(`${this.urlLocal}`, user, {observe: 'response'});
  }

  updateUserName(user: User): Observable<HttpResponse<User>> {
    return this.http.put<User>(`${this.urlLocal}/name`, user, {observe: 'response'});
  }

  userId(id: number): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${this.urlLocal}/${id}`, {observe: 'response'})
  }

  deleteUser(userId: number) {
    return this.http
      .delete<User>(this.urlLocal + '/delete/' + userId)
  }

  branchId(id: number): Observable<HttpResponse<Branch>> {
    return this.http.get<Branch>(`${this.local}/${id}`, {observe: 'response'})
  }

  users(): Observable<HttpResponse<User[]>> {
    return this.http
      .get<User[]>(this.urlLocal + '/List', {observe: 'response'})
  }

  branches(): Observable<HttpResponse<Branch[]>> {
    return this.http
      .get<Branch[]>(this.local + '/List', {observe: 'response'})
  }

  addBranch(branch: Branch): Observable<HttpResponse<Branch>> {
    return this.http
      .post<Branch>(this.local, branch, {observe: 'response'})
  }

  updateBranch(branch: Branch): Observable<HttpResponse<Branch>> {
    return this.http
      .put<Branch>(this.local, branch, {observe: 'response'})
  }

  allBranches(): Observable<HttpResponse<Branch[]>> {
    return this.http
      .get<Branch[]>(`${this.local}/allBranches`, {observe: 'response'})
  }

  // Cost Center
  CostCenterCompany(id: number): Observable<HttpResponse<CostCenter[]>> {
    return this.http
      .get<CostCenter[]>(`${this.CCUrl}/costCenter/${id}`, {observe: 'response'})
  }

  costCenterList() {
    return this.http
      .get<CostCenter[]>(this.CCUrl + '/List')
  }

  addcostCenter(costCenter: CostCenter): Observable<HttpResponse<CostCenter>> {
    return this.http
      .post<CostCenter>(this.CCUrl, costCenter, {observe: 'response'})
      .pipe(catchError(error => throwError(error)));
  }

  cl(costCenter: CostCenter): Observable<HttpResponse<CostCenter>> {
    return this.http
      .post<CostCenter>(`${this.CCUrl}/cl`, costCenter, {observe: 'response'})
  }

  CostCenterId(id: number): Observable<HttpResponse<CostCenter>> {
    return this.http
      .get<CostCenter>(`${this.CCUrl}/${id}`, {observe: 'response'})
  }

  updateOwner(idCostCenter: number, email: string, isStaff: boolean): Observable<HttpResponse<CostCenter>> {
    return this.http.get<CostCenter>(`${this.CCUrl}/${idCostCenter}/owner?email=${email}&isStaff=${isStaff}`, {
      observe: 'response',
    });
  }

  updateCostCenter(costCenter: CostCenter): Observable<HttpResponse<CostCenter>> {
    return this.http
      .put<CostCenter>(this.CCUrl, costCenter, {observe: 'response'})
      .pipe(catchError(error => throwError(error)));
  }

  deleteCC(ccId: CostCenter) {
    return this.http
      .delete<CostCenter>(this.CCUrl + '/deleteCostCenter/' + ccId)
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
