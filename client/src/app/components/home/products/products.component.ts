import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Routers } from 'src/app/core/common/common.types';
import { States } from 'src/app/core/features';
import { getAuth } from '../../authentication/core/store/auth.selector';
import { AuthState } from '../../authentication/core/types/auth.types';
import { LoginDialogComponent } from '../../authentication/login-dialog/login-dialog.component';
import { SignUpDialogComponent } from '../../authentication/sign-up-dialog/sign-up-dialog.component';
import { getCategories } from '../../categories/core/store/categories.selector';
import { Categories, CategoriesState } from '../../categories/core/types/categories.types';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public categories$!: Observable<Categories[] | null>;
  public isLoggedIn$!: Observable<AuthState>;
  public isLoggedIn: boolean = false;
  constructor(
    private dialog: MatDialog,
    private store: Store<{
      [States.Categories]: CategoriesState;
      [States.Auth]: AuthState;
    }>,
    private router: Router
  ) {}

  ngOnInit(): void {
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
      this.router.navigate([Routers.ADD_PRODUCT]);
    } else {
      this.openLoginDialog();
    }
  }

}
