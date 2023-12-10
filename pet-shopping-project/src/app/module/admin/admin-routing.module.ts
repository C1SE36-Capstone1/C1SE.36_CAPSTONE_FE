import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CategoryComponent } from './component/category/category/category.component';
import { ProductComponent } from './component/product/product/product.component';
import { UserComponent } from './component/user/user.component';
import { BreedComponent } from './component/breed/breed.component';
import { ProductCreateComponent } from './component/product/product-create/product-create.component';



const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent},
      { path: 'category', component: CategoryComponent},
      { path: 'product/create', component: ProductCreateComponent,},
      { path: 'product', component: ProductComponent},
      { path: 'dashboard', component: AdminComponent},
      { path: 'account', component: UserComponent},
      { path: 'breed', component: BreedComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
