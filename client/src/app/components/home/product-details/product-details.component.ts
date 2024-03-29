import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { States } from "src/app/core/features";
import { Products, ProductState } from "../core/types/home.types";
import * as ProductsAction from "../core/store/products.actions";
import { getProduct, getProducts } from "../core/store/products.selector";
import { Observable, map } from "rxjs";
import { CommonService } from "src/app/core/common/services/common.service";
import { Constants } from "src/app/utils/constants";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmModelComponent } from "src/app/core/common/components/confirm-model/confirm-model.component";
import { Routers } from "src/app/core/common/common.types";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent implements OnInit {
  private product_uid: any | undefined;
  public productDetails$!: Observable<ProductState>;
  public uid: string | undefined;
  public marker = {
    position: { lat: 0, lng: 0 },
 }
  constructor(
    private route: ActivatedRoute,
    private store: Store<{
      [States.Product]: ProductState;
    }>,
    private commonService: CommonService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.product_uid = this.route.snapshot.params["product_uid"];
    const uid: any = this.commonService.getLocalStorageData(Constants.TAG_UID);
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
    this.productDetails$ = this.store.select(getProduct).pipe(map((res: any) => {
      // this.marker.position.lat =
      console.log(res);

      return res
    }))
  }

  public getImage(image: string[] | undefined) {
    return image?.length ? image![0] : null;
  }

  public openReviewOrderOrEditProduct(
    isUser: boolean,
    productDetails: Products
  ) {
    if (isUser) {
      // this.router.navigate([Routers.REVIEW_ORDER]);
    } else {
      this.router.navigate([Routers.REVIEW_ORDER, productDetails.product_uid]);
    }
  }

  public openDeleteDialog(products: Products | null) {
    const dialogRef = this.dialog.open(ConfirmModelComponent, {
      width: "500px",
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
