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
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo'});
    const options = { headers };
    return this.http.get(environment.baseURL + API.CATEGORIES, options);
  }
}
