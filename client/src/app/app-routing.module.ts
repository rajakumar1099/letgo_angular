import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AuthGuard } from './components/authentication/core/services/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/home/product-details/product-details.component';
import { ProductsComponent } from './components/home/products/products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ReviewOrderComponent } from './components/review-order/review-order.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { MyListingComponent } from './components/user/my-listing/my-listing.component';
import { UserComponent } from './components/user/user.component';
import { Routers } from './core/common/common.types';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: Routers.PRODUCTS,
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ProductsComponent,
      },
      { path: ':product_uid', component: ProductDetailsComponent },
    ],
  },
  {
    path: Routers.ADD_PRODUCT,
    component: AddProductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: Routers.USER,
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: Routers.MY_LISTING },
      {
        path: Routers.MY_LISTING,
        component: MyListingComponent,
      },
      {
        path: Routers.EDIT_PROFILE,
        component: EditProfileComponent,
      },
      { path: ':product_uid', component: ProductDetailsComponent },
    ],
  },
  {
    path: Routers.REVIEW_ORDER,
    // component: ReviewOrderComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ':product_uid', component: ReviewOrderComponent },
    ]
  },
  { path: '**', redirectTo: '/404' },
  {
    path: '404',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
