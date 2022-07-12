import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/utils/Api';
import { Constants } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';
import { Currencies } from '../common.types';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public token: any = this.getUserDetails(Constants.TAG_USER_DATA)

  constructor(
    private http: HttpClient
  ) {}

  public getUserDetails(key: string): string | null {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key)!)
      : null;
  }

  public saveUserDetails(key: string, userDetails: any) {
    localStorage.setItem(key, JSON.stringify(userDetails));
  }

  public removeUserDetails(key: string) {
    localStorage.removeItem(key);
  }

  public getCurrencies() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token.Authorization });
    const options = { headers };
    return this.http.get(environment.baseURL + API.CURRENCIES, options);
  }
}
