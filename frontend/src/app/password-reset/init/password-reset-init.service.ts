import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from "../../../environments/environment";

@Injectable({ providedIn: 'root' })
export class PasswordResetInitService {
  private url = `${environment.UrlLocal}`

  constructor(private http: HttpClient) {}

  save(mail?: string): Observable<any> {
    return this.http.post(this.url + '/reset-password/init', mail);
  }
}
