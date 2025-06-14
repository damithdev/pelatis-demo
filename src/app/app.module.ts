/** Angular core modules */
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';

/** Service */
import { ConfigService } from './app-config.service';

/** Routes */
import { AppRoutes } from './app.routes';


/** Guards */

/** Modules */
import { AppComponent } from './app.component';
import { BusinessDashboardModule } from './modules/business-dashboard/business-dashboard.module';

/** Third Party */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ToastrModule } from 'ngx-toastr';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { RouterModule } from '@angular/router';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { BusinessDetailsModule } from './modules/business-details/business-details.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


///// Other




export function configServiceFactory(config: ConfigService) {
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
    RouterModule.forRoot(AppRoutes),
    BusinessDashboardModule,
    BusinessDetailsModule,
    OnboardingModule,
    SharedModule,
    CoreModule,
    AuthModule,

    /** Third Party Dependencies */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
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
