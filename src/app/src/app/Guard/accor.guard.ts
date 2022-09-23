import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from "../Account/login/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AccorGuard implements CanActivate {

  constructor(private router:Router, private tokenStorageService: TokenStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = this.tokenStorageService.getToken();
      if (token) {
        console.log('Ok Guard');
        return true;
      } else {
        console.log('NOk Guard');
        this.router.navigate(['/login']);
        return false;
      }
  }
}
