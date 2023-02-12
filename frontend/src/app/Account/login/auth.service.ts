import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { environment } from "../../../environments/environment";

const AUTH_API = `${environment.UrlLocal}/auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions).pipe(catchError(error => throwError(error)));
  }
}
