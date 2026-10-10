import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideCharts, withDefaultRegisterables, } from 'ng2-charts';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AuthTokenInterceptor } from '@shared/interceptors/auth.interceptor';
import { provideLottieOptions } from 'ngx-lottie';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideCharts(withDefaultRegisterables()),
    provideRouter(routes),
    // ✅ LOTTIE CONFIG (IMPORTANT)
    provideLottieOptions({
      player: () => import('lottie-web')
    }),
    {
      provide: DateAdapter,
      useFactory: adapterFactory

    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }).providers!
  ]
};
