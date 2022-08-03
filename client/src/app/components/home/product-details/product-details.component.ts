import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Features } from 'src/app/core/features';
import { ProductState } from '../core/types/home.types';
import * as ProductsAction from '../core/store/products.actions';
import { getProduct } from '../core/store/products.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  private product_uid: any | undefined;
  public productDetails$!: Observable<ProductState>;
  constructor(
    private route: ActivatedRoute,
    private store: Store<{
      [Features.Product]: ProductState;
    }>
  ) {}

  ngOnInit(): void {
    this.product_uid = this.route.snapshot.params['product_uid'];
    this.store.dispatch(
      ProductsAction.GetProduct({
        product_uid: this.product_uid,
      })
    );
    this.productDetails$ = this.store.select(getProduct);
  }

  public getImage(image: string[] | undefined){
    return image?.length ? image![0] : null;
  }
}
