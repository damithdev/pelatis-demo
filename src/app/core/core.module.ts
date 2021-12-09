import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { CustomHttpInterceptor } from './interceptors/http.interceptor';



@NgModule({
  declarations: [],
  imports: [
    SharedModule,
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: CustomHttpInterceptor, 
      multi: true 
    },
    

  ]
})
export class CoreModule { }
