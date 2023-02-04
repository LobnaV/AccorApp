import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, Subscription } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public clientId = 'ACCORHOSPITALITYNLNV.AccorAppUser';
  public clientSecret = 'c6f21019-9d78-44a2-b666-080f922c861d';
  public redirectUri = 'https://2e20-176-173-220-120.ngrok.io/auth/callback';

  constructor(private _http: HttpClient) { }

  retrieveToken(code: string): Observable<any> {
    console.log('retrieveToken')
    console.log(code)
    let params = new URLSearchParams();
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    // params.append('client_secret', this.clientSecret);
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers =
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)});

    return this._http.post('https://api-sandbox.tradeshift.com/tradeshift/auth/token',
      params.toString(), { headers: headers });
  }

  saveToken(token: any) {
    console.log('saveToken');
    console.log(token);
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    localStorage.setItem("access_token", token.access_token);
    console.log('Obtained Access token');
    // window.location.href = 'redirectUri';
  }

  getResource(resourceUrl: any) : Observable<any> {
    var headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer '+ localStorage.getItem('access_token')});
    return this._http.get(resourceUrl, { headers: headers })
      .pipe(catchError((error:any) => error.json().error || 'Server error'));
  }

  checkCredentials() {
    return localStorage.getItem('access_token') !== null;
  }

  logout() {
    localStorage.removeItem('access_token');
    window.location.reload();
  }
}
