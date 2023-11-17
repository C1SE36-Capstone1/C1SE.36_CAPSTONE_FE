import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: () => import('./module/home/home.module').then(module => module.HomeModule)},
  {path: 'products', loadChildren: () => import('./module/product/product.module').then(module => module.ProductModule)},
  {path: 'carts', loadChildren: () => import('./module/cart/cart.module').then(module => module.CartModule)},
  {path: 'users', loadChildren: () => import('./module/user/user.module').then(module => module.UserModule)},
  {path: 'login', loadChildren: () => import('./module/security/security.module').then(module => module.SecurityModule)},
  {path: 'accounts', loadChildren: () => import('./module/account/account.module').then(module => module.AccountModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
