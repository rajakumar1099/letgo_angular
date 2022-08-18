import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AuthGuard } from './components/authentication/core/services/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/home/product-details/product-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: HomeComponent/* , children: [ { path: 'add-product', component: AddProductComponent }, ] */ },
  { path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard] },
  { path: ':product_uid', component: ProductDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
