import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthState } from './components/authentication/core/types/auth.types';
import { AesEncryptDecryptService } from './utils/aes-encrypt-decrypt-service/aes-encrypt-decrypt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<AuthState> | undefined;
  constructor(
    private translate: TranslateService,
    public aesEncryptDecryptService: AesEncryptDecryptService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ngOnInit(): void {}
}
