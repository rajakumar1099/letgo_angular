import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/state';
import { LoginDialogComponent } from '../authentication/login-dialog/login-dialog.component';
import { SignUpDialogComponent } from '../authentication/sign-up-dialog/sign-up-dialog.component';
import * as AuthActions from '../../components/authentication/core/store/auth.actions';
import { Features } from 'src/app/core/features';
import { Observable, tap } from 'rxjs';
import { AuthState } from '../authentication/core/types/auth.types';

@Component({
  selector: 'app-hometoolbar',
  templateUrl: './hometoolbar.component.html',
  styleUrls: ['./hometoolbar.component.scss'],
})
export class HometoolbarComponent implements OnInit {
  public isLoggedIn$!: Observable<AuthState>;
  private isLoggedIn = false;
  @Output() openMenu: EventEmitter<any> = new EventEmitter();
  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.GetUser());
    this.isLoggedIn$ = this.store.select(Features.User).pipe(
      tap((res) => {
        this.isLoggedIn = !!res.user;
      })
    );
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
    if (this.isLoggedIn) {
    } else {
      this.openLoginDialog();
    }
  }

  public logOut(): void {
    this.store.dispatch(AuthActions.Logout());
  }
}
