import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { ShopComponent } from './component/shop/shop.component';
import { CustomerComponent } from './component/customer/customer.component';
import { SecurityModule } from '../security/security.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreedComponent } from './component/breed/breed.component';
import { CartComponent } from './component/cart/cart.component';
import { DetailPageComponent } from './component/detail-page/detail-page.component';
import { WishlistComponent } from './component/wishlist/wishlist.component';
import { HealthComponent } from './component/health/health.component';
import { UserInfoComponent } from './component/user-info/user-info.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaymentComponent } from './component/payment/payment.component';


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
    DetailPageComponent,
    WishlistComponent,
    HealthComponent,
    UserInfoComponent,
    PaymentComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SecurityModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  exports: [
  ],
})
export class HomeModule { }