import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Features } from 'src/app/core/features';
import { addProductFormValidator } from 'src/app/utils/form-validators';
import { AuthService } from '../authentication/core/services/auth.service';
import { getAuth } from '../authentication/core/store/auth.selector';
import { AuthState } from '../authentication/core/types/auth.types';
import { getCategories } from '../categories/core/store/categories.selector';
import { Categories, CategoriesState } from '../categories/core/types/categories.types';
import { ADDPRODUCT } from './core/types/add-products.types';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public categories$!: Observable<Categories[] | null>;
  public isLoggedIn$!: Observable<AuthState>;
  public isGivingAway = false;
  public form!: FormGroup;
  public readonly addProductForm = ADDPRODUCT;
	url: any; //Angular 11, for stricter type
	msg = "";
  constructor(
    private store: Store<{ [Features.Categories]: CategoriesState; [Features.Auth]: AuthState; }>,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.store.select(getCategories);
    this.isLoggedIn$ = this.store.select(getAuth)
    this.form = this.formBuilder.group(addProductFormValidator);
    this.form.controls[this.addProductForm.IS_GIVING_AWAY].valueChanges.subscribe((val)=>{
      if(val){
        this.form.controls[this.addProductForm.PRODUCT_PRICE].clearValidators()
        this.form.controls[this.addProductForm.PRODUCT_PRICE].updateValueAndValidity()
        this.form.controls[this.addProductForm.CURRENCY].clearValidators()
        this.form.controls[this.addProductForm.CURRENCY].updateValueAndValidity()
      } else {
        this.form.controls[this.addProductForm.PRODUCT_PRICE].setValidators([Validators.required])
        this.form.controls[this.addProductForm.PRODUCT_PRICE].updateValueAndValidity()
        this.form.controls[this.addProductForm.CURRENCY].setValidators([Validators.required])
        this.form.controls[this.addProductForm.CURRENCY].updateValueAndValidity()
      }
    })
  }

  public checkFormIsValid(control: string): boolean {
    return this.authService.checkFormIsValid(this.form, control);
  }

  public getErrorMessage(control: string): string {
    return this.authService.getTranslationErrorMessage(this.form, control);
  }

  public save(): void {
    console.log(this.form.value);
  }

  selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
		}
	}

}
