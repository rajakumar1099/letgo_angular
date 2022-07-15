import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/common/services/common.service';
import { API } from 'src/app/utils/Api';
import { Constants } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  constructor(private commonService: CommonService, private http: HttpClient, private router: Router) { }

  public createProduct(payload: any) {
    const token: any = this.commonService.getUserDetails(
      Constants.TAG_USER_DATA
    );
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http.post(
      environment.baseURL + API.CREATE_PRODUCT,
      payload,
      options
    ).subscribe(res => {
      this.router.navigateByUrl('/home')
    });
  }

  public uploadProductImages(uid: string, product_uid: string, data: any) {
    const token: any = this.commonService.getUserDetails(
      Constants.TAG_USER_DATA
    );
    const headers = new HttpHeaders({
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      // 'Content-Type': 'multipart/form-data',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    console.log(data);

    const formData = new FormData();
    Array.from(data).forEach(function (file) {
      console.log(file);

      formData.append('images', file as File);
    });
    const options = { headers };
    return this.http.post(
      environment.baseURL + API.UPLOAD_PRODUCT_IMAGE + uid + '/' + product_uid,
      formData,
      options
    );
  }
}
