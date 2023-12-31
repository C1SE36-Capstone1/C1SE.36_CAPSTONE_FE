import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { BodyComponent } from './component/body/body.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoryComponent } from './component/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from './component/product/product/product.component';
import { UserComponent } from './component/user/user.component';
import { BreedComponent } from './component/breed/breed.component';
import { ProductCreateComponent } from './component/product/product-create/product-create.component';
import { PetComponent } from './component/pet-manage/pet/pet.component';
import { PetCreateComponent } from './component/pet-manage/pet-create/pet-create.component';
import { ProductDetailComponent } from './component/product/product-detail/product-detail.component';
import { ProductEditComponent } from './component/product/product-edit/product-edit.component';

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';


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
    ProductCreateComponent, 
    PetComponent, 
    PetCreateComponent, 
    ProductDetailComponent, 
    ProductEditComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
  ],
})
export class AdminModule { }
