import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from '../home/component/home/home.component';
import { RegisterComponent } from './component/register/register.component';




const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
