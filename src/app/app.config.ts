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
import {TranslateService} from "./shared/services/translate/translate.service";
import {RegisterService} from "./shared/services/register/register.service";


export function loadMenu(menuService: MenuService) {
  return () => menuService.loadMenu().pipe();
}

export function loadConfigTable(loadConfigTable: RegisterService) {
  return () => loadConfigTable.loadModelRegister().pipe();
}

export function loadTranslationsFactory(translationService: TranslateService) {
  return () => translationService.loadTranslations().pipe();
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
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfigTable,
      deps: [RegisterService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: loadTranslationsFactory,
      deps: [TranslateService],
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
