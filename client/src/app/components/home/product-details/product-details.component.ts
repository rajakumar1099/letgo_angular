import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Features } from 'src/app/core/features';
import { Products, ProductState } from '../core/types/home.types';
import * as ProductsAction from '../core/store/products.actions';
import { getProduct, getProducts } from '../core/store/products.selector';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/core/common/services/common.service';
import { Constants } from 'src/app/utils/constants';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModelComponent } from 'src/app/core/common/components/confirm-model/confirm-model.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  private product_uid: any | undefined;
  public productDetails$!: Observable<ProductState>;
  public uid: string | undefined;
  constructor(
    private route: ActivatedRoute,
    private store: Store<{
      [Features.Product]: ProductState;
    }>,
    private commonService: CommonService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.product_uid = this.route.snapshot.params['product_uid'];
    const uid: any = this.commonService.getLocalStorageData(
      Constants.TAG_UID
    );
    this.uid = uid;
    this.store.dispatch(
      ProductsAction.GetProduct({
        product_uid: this.product_uid,
      })
    );
    this.store.dispatch(
      ProductsAction.GetComments({
        product_uid: this.product_uid,
      })
    );
    this.productDetails$ = this.store.select(getProduct);
  }

  public getImage(image: string[] | undefined) {
    return image?.length ? image![0] : null;
  }

  public openDeleteDialog(products: Products | null) {
    const dialogRef = this.dialog.open(ConfirmModelComponent, {
      width: '500px',
      data: products?.product_name,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(ProductsAction.ProductClearStore());
        this.store.dispatch(
          ProductsAction.DeleteProduct({ product_uid: result.product_uid })
        );
      }
    });
  }
}
