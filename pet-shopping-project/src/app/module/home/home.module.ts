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
    SecurityModule
  ]
})
export class HomeModule { }
