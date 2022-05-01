import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  constructor(private dialog: MatDialogRef<LoginDialogComponent>) {}

  ngOnInit(): void {}

  public closeDialog(): void {
    this.dialog.close();
  }

  public handleDialogLogin(): void {}
}
