import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { States } from 'src/app/core/features';
import { AddProductService } from '../../add-product/core/service/add-product.service';
import { getProducts } from '../core/store/products.selector';
import {
  Products,
  ProductsState,
  ProductState,
} from '../core/types/home.types';
import * as ProductsAction from '../core/store/products.actions';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss'],
})
export class HomeProductsComponent implements OnInit {
  public products$: Observable<ProductsState | null> | undefined;
  constructor(
    private store: Store<{
      [States.Products]: ProductsState;
      [States.Product]: ProductState;
    }>,
    public addProductService: AddProductService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
  }

  public navigateToProductDetail(product: Products) {
    this.store.dispatch(ProductsAction.ProductClearStore());
    this.router.navigate(['products/' + product.product_uid]);
  }
}
