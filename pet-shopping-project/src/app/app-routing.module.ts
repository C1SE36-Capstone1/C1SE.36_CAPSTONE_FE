import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: () => import('./module/home/home.module').then(module => module.HomeModule)},

  {path: 'users', loadChildren: () => import('./module/user/user.module').then(module => module.UserModule)},
  {path: 'login', loadChildren: () => import('./module/security/security.module').then(module => module.SecurityModule)},
  {path: 'accounts', loadChildren: () => import('./module/account/account.module').then(module => module.AccountModule)},
  {path: 'admin', loadChildren: () => import('./module/admin/admin.module').then(module => module.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
