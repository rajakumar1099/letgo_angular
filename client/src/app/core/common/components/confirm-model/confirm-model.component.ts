import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-model',
  templateUrl: './confirm-model.component.html',
  styleUrls: ['./confirm-model.component.scss'],
})
export class ConfirmModelComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  public closeDialog(data?: any) {
    this.dialogRef.close(data);
  }
}
