/** Angular core modules */
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';

/** Service */
import { ConfigService } from './app-config.service';

/** Routes */
import { AppRoutingModule } from './app-routing.module';


/** Guards */

/** Modules */
import { AppComponent } from './app.component';
import { BusinessDashboardModule } from './modules/business-dashboard/business-dashboard.module';

/** Third Party */
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


///// Other




export function configServiceFactory (config: ConfigService) {
  return () => config.load()
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    /** Angular core dependencies */
    BrowserModule,
    HttpClientModule,

    /** App Dependencies */
    AppRoutingModule,
    BusinessDashboardModule,

    /** Third Party Dependencies */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configServiceFactory,
      deps: [ConfigService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
