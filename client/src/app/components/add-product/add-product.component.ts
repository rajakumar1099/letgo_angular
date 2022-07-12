import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Features } from 'src/app/core/features';
import { addProductFormValidator } from 'src/app/utils/form-validators';
import { AuthService } from '../authentication/core/services/auth.service';
import { getAuth } from '../authentication/core/store/auth.selector';
import { AuthState } from '../authentication/core/types/auth.types';
import { getCategories } from '../categories/core/store/categories.selector';
import * as uuid from 'uuid';
import {
  Categories,
  CategoriesState,
  ChildCategories,
  SubCategories,
} from '../categories/core/types/categories.types';
import { ADDPRODUCT } from './core/types/add-products.types';
import { CommonService } from 'src/app/core/common/services/common.service';
import { Currencies } from 'src/app/core/common/common.types';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

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
  public isGivingAway = false;
  public form!: FormGroup;
  public readonly addProductForm = ADDPRODUCT;
  public urls = new Array<string>();
  public currencies: Currencies[] = [];
  private subs = new Subscription();
  @ViewChild("placesRef") placesRef: GooglePlaceDirective | undefined;

  constructor(
    private store: Store<{
      [Features.Categories]: CategoriesState;
      [Features.Auth]: AuthState;
    }>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private commonService: CommonService
  ) { }
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
    this.form = this.formBuilder.group(addProductFormValidator);
    this.form.controls[
      this.addProductForm.IS_GIVING_AWAY
    ].valueChanges.subscribe((val) => {
      if (val) {
        this.form.controls[this.addProductForm.PRODUCT_PRICE].clearValidators();
        this.form.controls[
          this.addProductForm.PRODUCT_PRICE
        ].updateValueAndValidity();
        this.form.controls[this.addProductForm.CURRENCY].clearValidators();
        this.form.controls[
          this.addProductForm.CURRENCY
        ].updateValueAndValidity();
      } else {
        this.form.controls[this.addProductForm.PRODUCT_PRICE].setValidators([
          Validators.required,
        ]);
        this.form.controls[
          this.addProductForm.PRODUCT_PRICE
        ].updateValueAndValidity();
        this.form.controls[this.addProductForm.CURRENCY].setValidators([
          Validators.required,
        ]);
        this.form.controls[
          this.addProductForm.CURRENCY
        ].updateValueAndValidity();
      }
    });
    this.form.controls[this.addProductForm.CATEGORY].valueChanges.subscribe(
      (val) => {
        const index =
          this.categories?.findIndex((category) => category.id === val) ?? 0;

        if (this.categories![index]?.sub_categories) {
          this.subCategories = this.categories![index].sub_categories;
        }
      }
    );
    this.form.controls[this.addProductForm.SUB_CATEGORY].valueChanges.subscribe(
      (val) => {
        const index =
          this.subCategories?.findIndex(
            (sub_category) => sub_category.id === val
          ) ?? 0;

        if (this.subCategories![index]?.child_categories) {
          this.childCategories = this.subCategories![index].child_categories;
        }
      }
    );
  }

  public onFileSelect(event: any) {
    if (event.target.files.length <= 5) {
      let files = { id: uuid.v4(), file: event.target.files };
      for (let file of files.file) {
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
      sub_category: [{
        id: sub_categories?.id,
        name: sub_categories?.name,
        child_category: [{
          id: child_categories?.id,
          name: child_categories?.name
        }]
      }]
    }
  }

  public save(): void {
    const payload = {
      product_name: this.form.controls[this.addProductForm.PRODUCT_TITLE].value,
      product_description:
        this.form.controls[this.addProductForm.PRODUCT_DESCRIPTION].value,
      product_price:
        this.form.controls[this.addProductForm.PRODUCT_PRICE].value,
      product_currency: this.form.controls[this.addProductForm.CURRENCY].value,
      is_giving_away:
        this.form.controls[this.addProductForm.IS_GIVING_AWAY].value,
      product_location:
        this.form.controls[this.addProductForm.PRODUCT_LOCATION].value,
      product_video:
        this.form.controls[this.addProductForm.PRODUCT_VIDEO].value,
      category: this.getCategoryWithId()
    };


    console.log(payload);
  }

  public handleAddressChange(address: Address) {

  }
}
