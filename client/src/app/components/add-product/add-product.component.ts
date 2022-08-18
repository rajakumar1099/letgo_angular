import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Features } from 'src/app/core/features';
import { addProductFormValidator } from 'src/app/utils/form-validators';
import { AuthService } from '../authentication/core/services/auth.service';
import { getAuth } from '../authentication/core/store/auth.selector';
import { AuthState } from '../authentication/core/types/auth.types';
import { getCategories } from '../categories/core/store/categories.selector';
import * as ProductsAction from '../home/core/store/products.actions';
import * as AddProductAction from '../add-product/core/store/add-products.actions';
import * as uuid from 'uuid';
import {
  Categories,
  CategoriesState,
  ChildCategories,
  SubCategories,
} from '../categories/core/types/categories.types';
import {
  AddProduct,
  ADDPRODUCT,
  AddProductState,
} from './core/types/add-products.types';
import { CommonService } from 'src/app/core/common/services/common.service';
import { Currencies } from 'src/app/core/common/common.types';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AddProductService } from './core/service/add-product.service';
import { Constants } from 'src/app/utils/constants';
import { Router } from '@angular/router';
import { ProductsState } from '../home/core/types/home.types';
import { getAddProduct } from './core/store/add-products.selector';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  public categories$: Observable<Categories[]> | undefined;
  public categories: Categories[] | null = [];
  public subCategories: SubCategories[] = [];
  public childCategories: ChildCategories[] = [];
  public isLoggedIn$!: Observable<AuthState>;
  public addProduct$!: Observable<AddProductState>;
  public isGivingAway = false;
  public form!: FormGroup;
  public readonly addProductForm = ADDPRODUCT;
  public urls = new Array<File>();
  public currencies: Currencies[] = [];
  private subs = new Subscription();
  private files!: any[];
  @ViewChild('placesRef') placesRef: GooglePlaceDirective | undefined;

  constructor(
    private store: Store<{
      [Features.Categories]: CategoriesState;
      [Features.Auth]: AuthState;
      [Features.Products]: ProductsState;
      [Features.AddProduct]: AddProductState;
    }>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private commonService: CommonService,
    public addProductService: AddProductService,
    public router: Router
  ) {}
  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }

  ngOnInit(): void {
    this.subs?.add(
      this.store
        .select(getCategories)
        .pipe(
          map((res) => {
            this.categories = res;
          })
        )
        .subscribe()
    );

    this.subs.add(
      this.commonService.getCurrencies().subscribe((res: any) => {
        this.currencies = res.data.currencies;
      })
    );

    this.isLoggedIn$ = this.store.select(getAuth);
    this.addProduct$ = this.store.select(getAddProduct);
    this.form = this.formBuilder.group(addProductFormValidator);
    this.subs.add(
      this.form.controls[this.addProductForm.CATEGORY].valueChanges.subscribe(
        (val) => {
          const index =
            this.categories?.findIndex((category) => category.id === val) ?? 0;

          if (this.categories![index]?.sub_categories) {
            this.subCategories = this.categories![index].sub_categories;
          }
        }
      )
    );
    this.subs.add(
      this.form.controls[
        this.addProductForm.SUB_CATEGORY
      ].valueChanges.subscribe((val) => {
        const index =
          this.subCategories?.findIndex(
            (sub_category) => sub_category.id === val
          ) ?? 0;

        if (this.subCategories![index]?.child_categories) {
          this.childCategories = this.subCategories![index].child_categories;
        }
      })
    );
  }

  public onFileSelect(event: any) {
    if (event.target.files.length <= 5) {
      this.files = event.target.files;
      for (let file of this.files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  public removeImage(index: number) {
    this.urls.splice(index, 1);
    if (!this.urls.length) {
      this.form.controls[this.addProductForm.PRODUCT_IMAGES].setValue(null);
    }
  }

  public checkFormIsValid(control: string): boolean {
    return this.authService.checkFormIsValid(this.form, control);
  }

  public getErrorMessage(control: string): string {
    return this.authService.getTranslationErrorMessage(this.form, control);
  }

  public getCategoryWithId() {
    const categories = this.categories?.find(
      (category) =>
        category?.id === this.form.controls[this.addProductForm.CATEGORY].value
    );
    const sub_categories = this.subCategories?.find(
      (sub_category) =>
        sub_category?.id ===
        this.form.controls[this.addProductForm.SUB_CATEGORY].value
    );
    const child_categories = this.childCategories?.find(
      (child_category) =>
        child_category?.id ===
        this.form.controls[this.addProductForm.CHILD_CATEGORY].value
    );
    return {
      id: categories?.id,
      name: categories?.name,
      sub_category: {
        id: sub_categories?.id,
        name: sub_categories?.name,
        child_category: {
          id: child_categories?.id,
          name: child_categories?.name,
        },
      },
    };
  }

  public save(): void {
    const uid: any = this.commonService.getLocalStorageData(
      Constants.TAG_UID
    );
    const product_uid = uuid.v4();
    const formData = new FormData();
    Array.from(this.urls).forEach(function (file) {
      formData.append('images', file);
    });

    const payload: AddProduct = {
      uid: uid,
      product_uid: product_uid,
      product_name: this.form.controls[this.addProductForm.PRODUCT_TITLE].value,
      product_description:
        this.form.controls[this.addProductForm.PRODUCT_DESCRIPTION].value,
      product_price:
        this.form.controls[this.addProductForm.PRODUCT_PRICE].value,
      product_currency: this.form.controls[this.addProductForm.CURRENCY].value,
      product_location:
        this.form.controls[this.addProductForm.PRODUCT_LOCATION].value,
      product_video:
        this.form.controls[this.addProductForm.PRODUCT_VIDEO].value,
      is_available: true,
      category: this.form.controls[this.addProductForm.CATEGORY].value,
      sub_category: this.form.controls[this.addProductForm.SUB_CATEGORY].value,
      child_category:
        this.form.controls[this.addProductForm.CHILD_CATEGORY].value,
    };

    for (let [key, val] of Object.entries(payload)) {
      formData.append(key, JSON.stringify(val));
    }

    this.store.dispatch(
      AddProductAction.AddProductRequest({ addProduct: formData })
    );
    this.form.reset();
  }

  public handleAddressChange(address: Address) {
    this.form.controls[this.addProductForm.PRODUCT_LOCATION].setValue(
      address.formatted_address
    );
  }
}
