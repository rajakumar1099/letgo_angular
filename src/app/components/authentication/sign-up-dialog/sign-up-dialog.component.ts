import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrls: ['./sign-up-dialog.component.scss'],
})
export class SignUpDialogComponent implements OnInit {
  constructor(private dialog: MatDialogRef<SignUpDialogComponent>) {}

  ngOnInit(): void {}

  public closeDialog(): void {
    this.dialog.close();
  }

  public handleDialogSignUp(): void {}
}
