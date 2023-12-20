import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path: '', loadChildren: () => import('./module/home/home.module').then(module => module.HomeModule)},
  {path: 'login', loadChildren: () => import('./module/security/security.module').then(module => module.SecurityModule)},
  {path: 'admin', loadChildren: () => import('./module/admin/admin.module').then(module => module.AdminModule)},
  {path: 'register', loadChildren: () => import('./module/security/security.module').then(module => module.SecurityModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
