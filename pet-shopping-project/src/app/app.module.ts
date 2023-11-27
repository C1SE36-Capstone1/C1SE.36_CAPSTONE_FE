import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './module/home/component/header/header.component'; 
import { FooterComponent } from './module/home/component/footer/footer.component'; 
import { ShopComponent } from './module/home/component/shop/shop.component'; 
import { HomeComponent } from './module/home/component/home/home.component'; 
import { ContactUsComponent } from './module/home/component/contact-us/contact-us.component';
import { SignupComponent } from './module/security/component/signup/signup.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ShopComponent,
    HomeComponent,
    ContactUsComponent,
    SignupComponent,  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
