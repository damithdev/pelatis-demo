import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
