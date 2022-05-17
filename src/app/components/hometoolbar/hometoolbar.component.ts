import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Constants } from 'src/app/utils/constants';
import { AuthService } from '../authentication/auth.service';
import { LoginDialogComponent } from '../authentication/login-dialog/login-dialog.component';
import { SignUpDialogComponent } from '../authentication/sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-hometoolbar',
  templateUrl: './hometoolbar.component.html',
  styleUrls: ['./hometoolbar.component.scss'],
})
export class HometoolbarComponent implements OnInit {
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {}

  public openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '500px',
      data: 'data',
      disableClose: true,
    });
  }

  public openSignUpDialog(): void {
    this.dialog.open(SignUpDialogComponent, {
      width: '500px',
      data: 'data',
      disableClose: true,
    });
  }

  public openAddProductPage(): void {
    this.isLoggedIn()
    if(this.isLoggedIn()){

    } else{
      this.openLoginDialog()
    }
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public logOut(): Promise<void> {
    return this.authService.signOut();
  }
}
