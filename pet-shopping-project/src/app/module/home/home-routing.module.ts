import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './component/contact-us/contact-us.component'; 
import { HomeComponent } from './component/home/home.component'; 
import { ShopComponent } from './component/shop/shop.component'; 
import { CustomerComponent } from './component/customer/customer.component';
import { LoginComponent } from '../security/component/login/login.component';
import { BreedComponent } from './component/breed/breed.component';
import { ProductDetailComponent } from '../product/component/product-detail/product-detail.component';
import { CartComponent } from './component/cart/cart.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'contact-us', component: ContactUsComponent},
      { path: 'breed', component: BreedComponent },
      { path: 'cart', component: CartComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'detail', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
