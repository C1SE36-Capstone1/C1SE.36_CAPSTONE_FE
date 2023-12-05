import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { BodyComponent } from './component/body/body.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoryComponent } from './component/category/category.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './component/product/product.component';
import { UserComponent } from './component/user/user.component';


@NgModule({
  declarations: [
    AdminComponent, 
    BodyComponent, 
    SidenavComponent, 
    DashboardComponent, 
    CategoryComponent, 
    ProductComponent, UserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
