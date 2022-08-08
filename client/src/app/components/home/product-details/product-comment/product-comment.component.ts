import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ADDPRODUCT } from 'src/app/components/add-product/core/types/add-products.types';
import { AuthService } from 'src/app/components/authentication/core/services/auth.service';
import { commentFormValidator } from 'src/app/utils/form-validators';

@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.scss'],
})
export class ProductCommentComponent implements OnInit {
  public form!: FormGroup;
  public readonly addProductForm = ADDPRODUCT;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(commentFormValidator);
  }

  public checkFormIsValid(control: string): boolean {
    return this.authService.checkFormIsValid(this.form, control);
  }

  public getErrorMessage(control: string): string {
    return this.authService.getTranslationErrorMessage(this.form, control);
  }
}
