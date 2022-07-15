import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { LoginDialogComponent } from '../authentication/login-dialog/login-dialog.component';
import { SignUpDialogComponent } from '../authentication/sign-up-dialog/sign-up-dialog.component';
import * as AuthActions from '../../components/authentication/core/store/auth.actions';
import { Features } from 'src/app/core/features';
import { Observable } from 'rxjs';
import { AuthState } from '../authentication/core/types/auth.types';
import { getAuth } from '../authentication/core/store/auth.selector';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-hometoolbar',
  templateUrl: './hometoolbar.component.html',
  styleUrls: ['./hometoolbar.component.scss'],
})
export class HometoolbarComponent implements OnInit {
  public isLoggedIn$!: Observable<AuthState>;
  @Output() addProductPage: EventEmitter<any> = new EventEmitter();
  @Output() openMenu: EventEmitter<any> = new EventEmitter();
  @ViewChild('placesRef') placesRef: GooglePlaceDirective | undefined;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ [Features.Auth]: AuthState }>,
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.select(getAuth);
  }

  public openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '500px',
      disableClose: true,
    });
  }

  public openSignUpDialog(): void {
    this.dialog.open(SignUpDialogComponent, {
      width: '500px',
      disableClose: true,
    });
  }

  public openMenuSidNav(): void {
    this.openMenu.emit();
  }

  public openAddProductPage(): void {
    this.addProductPage.emit();
  }

  public logOut(): void {
    this.store.dispatch(AuthActions.Logout());
  }
}
