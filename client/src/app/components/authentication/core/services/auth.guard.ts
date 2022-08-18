import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Routes } from 'src/app/core/common/common.types';
import { CommonService } from 'src/app/core/common/services/common.service';
import { Constants } from 'src/app/utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private commonService: CommonService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var isAuthenticated = this.commonService.getLocalStorageData(Constants.TAG_UID) ? true : false;
      if (!isAuthenticated) {
        this.router.navigate([Routes.PRODUCTS]);
      }
      return isAuthenticated;
  }

}
