import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactUsComponent } from './component/contact-us/contact-us.component'; 
import { HomeComponent } from './component/home/home.component'; 
import { ShopComponent } from './component/shop/shop.component'; 


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path:'home', component: HomeComponent},
  { path:'shop', component: ShopComponent},
  { path:'contact-us', component: ContactUsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
