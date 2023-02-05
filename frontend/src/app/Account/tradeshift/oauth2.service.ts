import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {
  static clientId = 'ACCORHOSPITALITYNLNV.AccorAppUser';
  static clientSecret = 'c6f21019-9d78-44a2-b666-080f922c861d';
  static redirectUri = 'https://78fe-2001-861-e380-ac10-f1fd-3888-22a6-3d2d.ngrok.io/auth/callback';
  static tokenUrl = 'https://api-sandbox.tradeshift.com/tradeshift/auth/token';

  constructor(private _http: HttpClient) { }

  retrieveToken(code: string): Observable<any> {
    console.log('retrieveToken')
    console.log(code)
    let params = new URLSearchParams();
    params.append('grant_type','authorization_code');
    params.append('client_id', Oauth2Service.clientId);
    params.append('redirect_uri', Oauth2Service.redirectUri);
    params.append('code',code);

    let headers =
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa(Oauth2Service.clientId + ':' + Oauth2Service.clientSecret)});

    return this._http.post(Oauth2Service.tokenUrl,
      params.toString(), { headers: headers });
  }
  async getAccessToken(): Promise<string> {
    let accessToken = localStorage.getItem('access_token');
    if (!this.checkCredentials()) {
      const refreshToken = localStorage.getItem('refresh_token');
      try {
        let params = new URLSearchParams();
        params.append('grant_type','refresh_token');
        params.append('client_id', Oauth2Service.clientId);
        params.append('client_secret', Oauth2Service.clientSecret);
        params.append('refresh_token', refreshToken!);

        let headers =
          new HttpHeaders({
            'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            'Authorization': 'Bearer ' + accessToken
          });

        const response = await this._http.post<any>(Oauth2Service.tokenUrl, params.toString(), { headers: headers }).toPromise();
        accessToken = response.data.access_token;
        const now = new Date().getTime() / 1000;
        localStorage.setItem('access_token', accessToken!);
        localStorage.setItem('expires_in', response.data.expires_in + now);
      } catch (error) {
        console.error(error);
      }
    }
    return accessToken!;
  };

  getToken(): string {
    return localStorage.getItem('access_token')!;
  };

  saveToken(token: any) {
    console.log('saveToken');
    console.log(token);
    const now = new Date().getTime() / 1000;
    localStorage.setItem("access_token", token.access_token);
    localStorage.setItem('refresh_token', token.refresh_token);
    localStorage.setItem("expires_in", String(token.expires_in + now));
    console.log('Obtained Access token');
  }

  checkCredentials(): boolean {
    console.log('checkCredentials');
    const now = new Date().getTime() / 1000;
    const expiresIn = localStorage.getItem('expires_in');
    return localStorage.getItem('access_token') !== null && expiresIn != null && (Number(expiresIn) > now);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('refresh_token');
  }
}
