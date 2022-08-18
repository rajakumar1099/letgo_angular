import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { ADDPRODUCT } from 'src/app/components/add-product/core/types/add-products.types';
import { AuthService } from 'src/app/components/authentication/core/services/auth.service';
import { CommonService } from 'src/app/core/common/services/common.service';
import { Features } from 'src/app/core/features';
import { Constants } from 'src/app/utils/constants';
import { commentFormValidator } from 'src/app/utils/form-validators';
import { getComments } from '../../core/store/products.selector';
import { CommentState, Comment, Products } from '../../core/types/home.types';
import * as ProductsAction from '../../../home/core/store/products.actions';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModelComponent } from 'src/app/core/common/components/confirm-model/confirm-model.component';

@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.scss'],
})
export class ProductCommentComponent implements OnInit {
  public form!: FormGroup;
  public readonly addProductForm = ADDPRODUCT;
  public comments$!: Observable<CommentState>;
  @Input() productData!: Products | null;
  public uid: string | undefined;
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private store: Store<{
      [Features.Comments]: CommentState;
    }>,
    private commonService: CommonService,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(commentFormValidator);
    this.comments$ = this.store.select(getComments);
    const uid: any = this.commonService.getLocalStorageData(Constants.TAG_UID);
    this.uid = uid;
    if (!uid) {
      this.form.controls[this.addProductForm.COMMENT].disable();
    }
  }

  public deleteComment(comment: Comment) {
    const dialogRef = this.dialog.open(ConfirmModelComponent, {
      width: '500px',
      data: 'this comment',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(
          ProductsAction.DeleteComments({
            product_uid: comment.product_uid,
            id: comment.id,
          })
        );
        this.form.reset();
      }
    });
    
  }

  public postComment() {
    const payload = {
      product_uid: this.productData?.product_uid,
      uid: this.uid,
      comment: this.form.controls[ADDPRODUCT.COMMENT].value,
    };
    this.store.dispatch(
      ProductsAction.AddComments({
        payload,
      })
    );
    this.form.reset();
  }

  public setPlaceHolderText(): String {
    return this.uid ? this.translate.instant('common.typeYourComment') : this.translate.instant('common.loginToComment')
  }

  public checkFormIsValid(control: string): boolean {
    return this.authService.checkFormIsValid(this.form, control);
  }

  public getErrorMessage(control: string): string {
    return this.authService.getTranslationErrorMessage(this.form, control);
  }
}
