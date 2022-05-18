import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AesEncryptDecryptService {
  constructor() {}

  public encryptText(value: string): string {
    return CryptoJS.AES.encrypt(value.trim(), Constants.AES_KEY.trim()).toString();
  }

  public decryptText(encryptedValue: string): string {
    return CryptoJS.AES.decrypt(encryptedValue, Constants.AES_KEY.trim()).toString(
      CryptoJS.enc.Utf8
    );
  }
}
