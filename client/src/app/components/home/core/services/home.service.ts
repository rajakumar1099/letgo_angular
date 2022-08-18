import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/core/common/services/common.service';
import { API } from 'src/app/utils/Api';
import { Constants } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private commonService: CommonService) {}

  public getHomeData() {
    const token: any =
      this.commonService.getLocalStorageData(Constants.TAG_AUTHORIZATION) ?? null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http.get(environment.baseURL + API.PRODUCTS, options);
  }

  public getProductData(product_uid: any) {
    const token: any =
      this.commonService.getLocalStorageData(Constants.TAG_AUTHORIZATION) ?? null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http.get(
      environment.baseURL + API.PRODUCTS + '/' + product_uid,
      options
    );
  }

  public getComments(product_uid: any) {
    const token: any =
      this.commonService.getLocalStorageData(Constants.TAG_AUTHORIZATION) ?? null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http.get(
      environment.baseURL + API.PRODUCTS + '/' + product_uid + API.COMMENT,
      options
    );
  }

  public deleteProduct(product_uid: any) {
    const token: any =
      this.commonService.getLocalStorageData(Constants.TAG_AUTHORIZATION) ?? null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http.delete(
      environment.baseURL + API.PRODUCTS + '/' + product_uid,
      options
    );
  }

  public deleteComments(product_uid: any, id: any) {
    const token: any =
      this.commonService.getLocalStorageData(Constants.TAG_AUTHORIZATION) ?? null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http.delete(
      environment.baseURL +
        API.PRODUCTS +
        '/' +
        product_uid +
        API.COMMENT +
        '/' +
        id,
      options
    );
  }
  public addComments(payload: any) {
    const token: any =
      this.commonService.getLocalStorageData(Constants.TAG_AUTHORIZATION) ?? null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http.post(
      environment.baseURL + API.PRODUCTS + API.COMMENT,
      payload,
      options
    );
  }
}
