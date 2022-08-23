import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/core/common/services/common.service';
import { API } from 'src/app/utils/Api';
import { Constants } from 'src/app/utils/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    
    constructor(private translate: TranslateService, private http: HttpClient, private commonService: CommonService) {}
  public getFormErrorMessage(form: FormGroup, control: string): string {
    if (form.controls[control].hasError('required')) {
      return this.translate.instant('validators.thisFieldIsRequired');
    } else if (form.controls[control].hasError('email')) {
      return this.translate.instant('validators.invalidEmailError');
    } else if (form.controls[control].hasError('whitespace')) {
      return this.translate.instant('validators.invalidUsernameError');
    } else if (form.controls[control].hasError('maxlength')) {
      return this.translate.instant('validators.maxLengthError');
    } else {
      return this.translate.instant('errors.somethingWentWrong');
    }
  }

  public getProfileData(uid: string) {
    const token: any =
    this.commonService.getLocalStorageData(Constants.TAG_AUTHORIZATION) ?? null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http.get(environment.baseURL + API.LOGIN + '/' + uid,  options);
  }

  public updateProfile(payload: any) {
    const token: any =
    this.commonService.getLocalStorageData(Constants.TAG_AUTHORIZATION) ?? null;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmIwNjc4OTQ1YjI4OWU0ZjIwN2IyZmQiLCJpYXQiOjE2NTU3OTEyNDJ9.RfesawdCqPjCd4mxE1wsu_m6f43lvKVdNkwbcm6L6qo',
    });
    const options = { headers };
    return this.http.post(environment.baseURL + API.PROFILES, payload, options);
  }
}
