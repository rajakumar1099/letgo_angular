import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';


const mat = [
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    mat
  ],
  exports: [
    mat
  ]
})
export class MaterialModule { }
