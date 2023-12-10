import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { BodyComponent } from './component/body/body.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoryComponent } from './component/category/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './component/product/product/product.component';
import { UserComponent } from './component/user/user.component';
import { BreedComponent } from './component/breed/breed.component';
import { ProductCreateComponent } from './component/product/product-create/product-create.component';
import { CategoryCreateComponent } from './component/category/category-create/category-create.component';


@NgModule({
  declarations: [
    AdminComponent, 
    BodyComponent, 
    SidenavComponent, 
    DashboardComponent, 
    CategoryComponent, 
    ProductComponent, 
    UserComponent, 
    BreedComponent, 
    ProductCreateComponent, CategoryCreateComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
