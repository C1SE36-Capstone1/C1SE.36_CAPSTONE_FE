import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { ShopComponent } from './component/shop/shop.component';
import { CustomerComponent } from './component/customer/customer.component';
import { SecurityModule } from '../security/security.module';
import { FormsModule } from '@angular/forms';
import { BreedComponent } from './component/breed/breed.component';
import { CartComponent } from './component/cart/cart.component';
import { HealthComponent } from './component/health/health.component';
import { DetailPageComponent } from './component/detail-page/detail-page.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';



@NgModule({
  declarations: [
    ShopComponent,
    HomeComponent,
    ContactUsComponent,
    CustomerComponent,
    BreedComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    HealthComponent,
    DetailPageComponent,
    WishlistComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SecurityModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
})
export class HomeModule { }
