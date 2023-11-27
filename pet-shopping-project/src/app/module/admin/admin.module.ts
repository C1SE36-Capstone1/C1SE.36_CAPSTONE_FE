import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import { BodyComponent } from './component/admin/body/body.component';
import { SidenavComponent } from './component/admin/sidenav/sidenav.component';


@NgModule({
  declarations: [AdminComponent, BodyComponent, SidenavComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
