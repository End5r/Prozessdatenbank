import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig) // Einstiegspunkt für die Kompilation
  .catch((err) => console.error(err));
