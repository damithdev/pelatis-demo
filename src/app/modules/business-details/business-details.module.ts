import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { BusinessDetailsRoutes } from './business-details.routes';
import { BusinessFormComponent } from './business-form/business-form.component';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessDetailsFacade } from './store/business-details.facade';



@NgModule({
  declarations: [
    BusinessListComponent,
    BusinessFormComponent,
  ],
  exports: [
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(BusinessDetailsRoutes),
  ],
  providers:[
    BusinessDetailsFacade
  ]
})
export class BusinessDetailsModule { }
