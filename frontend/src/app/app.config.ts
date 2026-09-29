import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient() // needed to send HTTP Requests
  ]
};
