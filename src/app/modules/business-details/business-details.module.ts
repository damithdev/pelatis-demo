import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BusinessDetailsRoutes } from './business-details.routes';
import { BusinessDetailsStoreFacade } from './store/business-details-store.facade';
import { BusinessFormComponent } from './business-form/business-form.component';
import { BusinessListComponent } from './business-list/business-list.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { BusinessDetailsComponent } from './business-details.component';




@NgModule({
  declarations: [
    BusinessDetailsComponent,
    BusinessListComponent,
    BusinessFormComponent,
  ],
  exports: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(BusinessDetailsRoutes),
    StoreModule.forFeature('BUSINESS',reducers),
    EffectsModule.forFeature(effects)
  ],
  providers:[
    BusinessDetailsStoreFacade
  ]
})
export class BusinessDetailsModule { }
