import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingComponent } from './onboarding.component';
import { OnboardingRoutes } from './onboarding.routes';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    OnboardingComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(OnboardingRoutes),
  ],
  exports:[
    OnboardingComponent
  ]
})
export class OnboardingModule { }
