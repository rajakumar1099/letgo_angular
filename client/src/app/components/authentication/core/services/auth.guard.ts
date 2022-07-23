import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
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
      var isAuthenticated = this.commonService.getUserDetails(Constants.TAG_USER_DATA) ? true : false;
      if (!isAuthenticated) {
          this.router.navigate(['/home']);
      }
      return isAuthenticated;
  }

}
