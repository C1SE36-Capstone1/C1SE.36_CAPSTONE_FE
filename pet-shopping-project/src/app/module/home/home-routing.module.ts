import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { HomeComponent } from './component/home/home.component';
import { ShopComponent } from './component/shop/shop.component';
import { CustomerComponent } from './component/customer/customer.component';
import { LoginComponent } from '../security/component/login/login.component';
import { BreedComponent } from './component/breed/breed.component';
import { CartComponent } from './component/cart/cart.component';
import { DetailPageComponent } from './component/detail-page/detail-page.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { HealthComponent } from './component/health/health.component';
import { UserInfoComponent } from './component/user-info/user-info.component';



const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'contact-us', component: ContactUsComponent},
      { path: 'breed', component: BreedComponent},
      { path: 'cart', component: CartComponent},
      { path: 'detail', component: DetailPageComponent},
      { path: 'shop/:categoryName', component: ShopComponent },
      { path: 'breed/:breedName', component: BreedComponent},
      { path: 'wishlist', component: WishlistComponent},
      { path: 'health', component: HealthComponent},
      { path: 'user-info', component: UserInfoComponent}
    ]
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
