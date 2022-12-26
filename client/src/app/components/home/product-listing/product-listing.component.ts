import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { States } from 'src/app/core/features';
import { getListing } from '../../user/core/store/user.selector';
import { Products, ProductsState } from '../core/types/home.types';
import * as ProductsAction from '../core/store/products.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  public products$: Observable<ProductsState | null> | undefined;

  constructor(
    private store: Store<{
      [States.Products]: ProductsState;
    }>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(getListing);
  }

  public navigateToProductDetail(product: Products) {
    this.store.dispatch(ProductsAction.ProductClearStore());
    this.router.navigate(['products/' + product.product_uid]);
  }
}
