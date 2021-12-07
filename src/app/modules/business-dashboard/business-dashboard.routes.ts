import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { BusinessDashbaordComponent } from './business-dashbaord/business-dashbaord.component';

export const BusinessDashboardRoutes: Routes = [{ path: '', component: BusinessDashbaordComponent,canActivate: [AuthGuard],
}]