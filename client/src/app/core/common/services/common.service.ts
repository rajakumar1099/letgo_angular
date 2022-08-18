import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from 'src/app/utils/Api';
import { Constants } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public token: any = this.getLocalStorageData(Constants.TAG_AUTHORIZATION);

  constructor(private http: HttpClient) {}

  public getLocalStorageData(key: string): string | null {
    if(localStorage.getItem(key) === "undefined"){
      this.removeUserDetails(key)
      return null
    }
    return JSON.parse(localStorage.getItem(key)!);
  }

  public setLocalStorageData(key: string, userDetails: any) {
    localStorage.setItem(key, JSON.stringify(userDetails));
  }

  public removeUserDetails(key: string) {
    localStorage.removeItem(key);
  }

  public getCurrencies() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http.get(environment.baseURL + API.CURRENCIES, options);
  }
}
