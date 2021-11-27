import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BusinessDashbaordComponent } from './business-dashbaord/business-dashbaord.component';
import { ActionListComponent } from './business-dashbaord/action-list/action-list.component';
import { BusinessStatsComponent } from './business-dashbaord/business-stats/business-stats.component';
import { RouterModule } from '@angular/router';
import { BusinessDashboardRoutes } from './business-dashboard.routes';



@NgModule({
  declarations: [
    BusinessDashbaordComponent,
    ActionListComponent,
    BusinessStatsComponent
  ],
  exports: [
    BusinessDashbaordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(BusinessDashboardRoutes)
  ]
})
export class BusinessDashboardModule { }
