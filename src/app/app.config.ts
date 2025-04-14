import {ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideStore, withNgxsPendingTasks} from '@ngxs/store';


import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {CurrentUserState} from './state';
import {withNgxsReduxDevtoolsPlugin} from '@ngxs/devtools-plugin';
import {withNgxsLoggerPlugin} from '@ngxs/logger-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(),
    provideStore([CurrentUserState]),
    withNgxsReduxDevtoolsPlugin({
      disabled: false,
    }),
    withNgxsLoggerPlugin({
      collapsed: true,
      disabled: true,
    }),
    withNgxsPendingTasks(),]
};
