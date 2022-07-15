import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatCardModule} from '@angular/material/card';

const mat = [
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatDialogModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatExpansionModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatCardModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, mat],
  exports: [mat],
})
export class MaterialModule {}
