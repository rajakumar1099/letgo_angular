import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Features } from 'src/app/core/features';
import { AddProductService } from '../../add-product/core/service/add-product.service';
import { getProducts } from '../core/store/products.selector';
import { Products, ProductState } from '../core/types/home.types';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss'],
})
export class HomeProductsComponent implements OnInit {
  public products$: Observable<ProductState | null> | undefined;
  constructor(private store: Store<{ [Features.Products]: ProductState }>, public addProductService: AddProductService) { }

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
  }
}
