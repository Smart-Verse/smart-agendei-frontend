import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import {providePrimeNG} from "primeng/config";
import { SmartVerseTheme } from "./shared/styles/smartverse-theme";
import {SmartVerseAgendeiTheme} from "./shared/styles/smart-agendei-theme";
import {MenuService} from "./shared/services/menu/menu.service";


export function loadMenu(menuService: MenuService) {
  return () => menuService.loadMenu().pipe();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: loadMenu,
      deps: [MenuService],
      multi: true
    },
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
