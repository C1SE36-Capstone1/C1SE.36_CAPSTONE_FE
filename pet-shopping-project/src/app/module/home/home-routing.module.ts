import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './component/customer/contact-us/contact-us.component'; 
import { HomeComponent } from './component/customer/home/home.component'; 
import { ShopComponent } from './component/customer/shop/shop.component'; 
import { CustomerComponent } from './component/customer/customer.component';


const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'contact-us', component: ContactUsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
