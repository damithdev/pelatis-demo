import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessDashbaordComponent } from './business-dashbaord/business-dashbaord.component';



@NgModule({
  declarations: [
    BusinessDashbaordComponent
  ],
  exports: [
    BusinessDashbaordComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BusinessDashboardModule { }
