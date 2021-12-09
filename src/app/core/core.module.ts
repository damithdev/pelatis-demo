import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi: true

    }
  ]
})
export class CoreModule { }
