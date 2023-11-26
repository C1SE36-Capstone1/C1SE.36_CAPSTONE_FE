import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ContactUsComponent } from './component/customer/contact-us/contact-us.component';
import { FooterComponent } from './component/customer/footer/footer.component';
import { HeaderComponent } from './component/customer/header/header.component';
import { HomeComponent } from './component/customer/home/home.component';
import { ShopComponent } from './component/customer/shop/shop.component';
import { CustomerComponent } from './component/customer/customer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ShopComponent,
    HomeComponent,
    ContactUsComponent,
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
