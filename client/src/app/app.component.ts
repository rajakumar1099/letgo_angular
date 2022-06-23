import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, tap } from 'rxjs';
import { getAuth } from './components/authentication/core/store/auth.selector';
import { AuthState } from './components/authentication/core/types/auth.types';
import { LoginDialogComponent } from './components/authentication/login-dialog/login-dialog.component';
import { SignUpDialogComponent } from './components/authentication/sign-up-dialog/sign-up-dialog.component';
import { getCategories } from './components/categories/core/store/categories.selector';
import { Categories, CategoriesState } from './components/categories/core/types/categories.types';
import { Features } from './core/features';
import { AesEncryptDecryptService } from './utils/aes-encrypt-decrypt-service/aes-encrypt-decrypt.service';
import * as AuthActions from './components/authentication/core/store/auth.actions';
import * as CategoriesActions from './components/categories/core/store/categories.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // user$: Observable<AuthState> | undefined;
  public categories$!: Observable<Categories[] | null>;
  public isLoggedIn$!: Observable<AuthState>;
  public isLoggedIn: boolean = false;
  constructor(
    private translate: TranslateService,
    public aesEncryptDecryptService: AesEncryptDecryptService,
    private dialog: MatDialog,
    private store: Store<{
      [Features.Categories]: CategoriesState;
      [Features.Auth]: AuthState;
    }>,
    private router: Router,
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
  ngOnInit(): void {
    this.store.dispatch(AuthActions.GetUser());
    this.store.dispatch(CategoriesActions.GetCategories());
    this.categories$ = this.store.select(getCategories);
    this.isLoggedIn$ = this.store.select(getAuth).pipe(
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

  public openAddproductPage(): void {
    if (this.isLoggedIn) {
      // this.router.navigate(['add-product'], {relativeTo: this.activateRoute})
      this.router.navigate(['add-product']/* , {relativeTo: this.activateRoute} */)
    } else{
      this.openLoginDialog();
    }
  }
}
