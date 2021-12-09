import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BusinessDashbaordComponent } from './business-dashbaord/business-dashbaord.component';
import { ActionListComponent } from './business-dashbaord/action-list/action-list.component';
import { BusinessStatsComponent } from './business-dashbaord/business-stats/business-stats.component';
import { RouterModule } from '@angular/router';
import { BusinessDashboardRoutes } from './business-dashboard.routes';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { effects } from './store/effects';



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
    SharedModule,
    RouterModule.forChild(BusinessDashboardRoutes),
    ChartsModule,
    StoreModule.forFeature('businessDashboard',reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class BusinessDashboardModule { }
