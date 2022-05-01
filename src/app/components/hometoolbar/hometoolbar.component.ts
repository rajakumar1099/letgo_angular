import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../authentication/login-dialog/login-dialog.component';
import { SignUpDialogComponent } from '../authentication/sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-hometoolbar',
  templateUrl: './hometoolbar.component.html',
  styleUrls: ['./hometoolbar.component.scss']
})
export class HometoolbarComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent,{
      data: 'data'
    })
  }

  public openSignUpDialog(): void {
    this.dialog.open(SignUpDialogComponent,{
      data: 'data'
    })
  }

}
