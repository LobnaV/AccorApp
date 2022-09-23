import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PasswordResetFinishService {
  private url = `${environment.UrlLocal}`
  constructor(private http: HttpClient) {}

  save(keyAndPassword: any): Observable<any> {
    return this.http.post(this.url + '/reset-password/finish', keyAndPassword);
  }
}
