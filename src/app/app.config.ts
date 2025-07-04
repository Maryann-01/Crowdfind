import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient ,withFetch} from '@angular/common/http'; 
import { routes } from './app.routes';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(NgxSkeletonLoaderModule)
  ]
};
