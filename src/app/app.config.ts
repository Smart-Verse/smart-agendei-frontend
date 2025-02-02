import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import {providePrimeNG} from "primeng/config";
import { SmartVerseTheme } from "./shared/styles/smartverse-theme";
import {SmartVerseAgendeiTheme} from "./shared/styles/smart-agendei-theme";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: SmartVerseAgendeiTheme,
        options: {
          prefix: 'p',
          darkModeSelector: false,
          cssLayer: false,
          ripple: true,
          dark: true,
        }
      }
    })
  ]
};
