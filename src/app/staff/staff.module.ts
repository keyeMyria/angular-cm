import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MainComponent } from './main/main.component';
import { ClarityModule } from '../../../node_modules/@clr/angular';
import { RequestComponent } from './request/request.component';

@NgModule({
  imports: [
    CommonModule,
    StaffRoutingModule,
    ClarityModule
  ],
  declarations: [LayoutComponent, MainComponent, RequestComponent]
})
export class StaffModule { }
