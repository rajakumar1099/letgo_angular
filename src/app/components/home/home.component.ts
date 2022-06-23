import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Features } from 'src/app/core/features';
import { getCategories } from '../categories/core/store/categories.selector';
import { Categories, CategoriesState } from '../categories/core/types/categories.types';
import * as AuthActions from '../authentication/core/store/auth.actions';
import * as CategoriesActions from '../categories/core/store/categories.actions';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../authentication/login-dialog/login-dialog.component';
import { SignUpDialogComponent } from '../authentication/sign-up-dialog/sign-up-dialog.component';
import { AuthState } from '../authentication/core/types/auth.types';
import { getAuth } from '../authentication/core/store/auth.selector';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public categories$!: Observable<Categories[] | null>;
  public isLoggedIn$!: Observable<AuthState>;
  public isLoggedIn: boolean = false;
  constructor(
    private dialog: MatDialog,
    private store: Store<{
      [Features.Categories]: CategoriesState;
      [Features.Auth]: AuthState;
    }>,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

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
