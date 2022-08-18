import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/core/common/services/common.service';
import { API } from 'src/app/utils/Api';
import { Constants } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  constructor(
    private commonService: CommonService,
    private http: HttpClient,
  ) {}

  public createProduct(payload: any) {
    const token: any = this.commonService.getLocalStorageData(
      Constants.TAG_AUTHORIZATION
    );
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http
      .post(environment.baseURL + API.CREATE_PRODUCT, payload, options)
  }
}
