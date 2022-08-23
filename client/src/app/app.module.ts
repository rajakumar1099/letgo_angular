import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HometoolbarComponent } from './components/hometoolbar/hometoolbar.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './modules/material/material.module';
import { LoginDialogComponent } from './components/authentication/login-dialog/login-dialog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FirebaseModule } from './modules/firebase/firebase.module';
import { SignUpDialogComponent } from './components/authentication/sign-up-dialog/sign-up-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './components/authentication/core/services/auth.service';
import { AesEncryptDecryptService } from './utils/aes-encrypt-decrypt-service/aes-encrypt-decrypt.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppState, AppReducers } from './core/state';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthEffects } from './components/authentication/core/store/auth.effects';
import { CategoryHeaderComponent } from './components/categories/category-header/category-header.component';
import { CategoriesEffects } from './components/categories/core/store/categories.effects';
import { CategoryHeaderMenuComponent } from './components/categories/category-header-menu/category-header-menu.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { HomeFooterComponent } from './components/home/home-footer/home-footer.component';
import { HomeProductsComponent } from './components/home/home-products/home-products.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ProductsEffects } from './components/home/core/store/products.effects';
import { AddProductsEffects } from './components/add-product/core/store/add-products.effects';
import { HomeCarouselComponent } from './components/home/home-carousel/home-carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './components/home/product-details/product-details.component';
import { ProductDescriptionComponent } from './components/home/product-details/product-description/product-description.component';
import { ProductOverallDetailComponent } from './components/home/product-details/product-overall-detail/product-overall-detail.component';
import { ProductCommentComponent } from './components/home/product-details/product-comment/product-comment.component';
import { ConfirmModelComponent } from './core/common/components/confirm-model/confirm-model.component';
import { UserComponent } from './components/user/user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductsComponent } from './components/home/products/products.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { MyListingComponent } from './components/user/my-listing/my-listing.component';
import { UserEffects } from './components/user/core/store/user.effects';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HometoolbarComponent,
    HomeComponent,
    LoginDialogComponent,
    SignUpDialogComponent,
    CategoryHeaderComponent,
    CategoryHeaderMenuComponent,
    AddProductComponent,
    HomeFooterComponent,
    HomeProductsComponent,
    HomeCarouselComponent,
    ProductDetailsComponent,
    ProductDescriptionComponent,
    ProductOverallDetailComponent,
    ProductCommentComponent,
    ConfirmModelComponent,
    UserComponent,
    PageNotFoundComponent,
    ProductsComponent,
    EditProfileComponent,
    MyListingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    EffectsModule.forRoot([
      AuthEffects,
      CategoriesEffects,
      ProductsEffects,
      AddProductsEffects,
      UserEffects
    ]),
    BrowserAnimationsModule,
    MaterialModule,
    FirebaseModule,
    StoreModule.forRoot<AppState>(AppReducers),
    StoreDevtoolsModule.instrument({
      logOnly: !environment.production,
    }),
    NgbModule,
    ToastrModule.forRoot({
      closeButton: true
    }),
  ],
  providers: [AuthService, AesEncryptDecryptService],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
