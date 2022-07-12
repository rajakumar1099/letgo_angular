import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/core/common/services/common.service';
import { API } from 'src/app/utils/Api';
import { Constants } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private http: HttpClient,
    private commonService: CommonService
    ) {}

  public getCategory() {
    const token: any = this.commonService.getUserDetails(Constants.TAG_USER_DATA)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': token.Authorization});
    const options = { headers };
    return this.http.get(environment.baseURL + API.CATEGORIES, options);
  }
}
