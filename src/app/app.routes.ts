import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  // {
  //   // Lazy Loading
  //   path:'home',
  //   loadChildren:()=>import('./modules/business-dashboard/business-dashboard.module').then(m=>m.BusinessDashboardModule)
  // },
  {
    path: '**',
    redirectTo: 'home'
  }
];
