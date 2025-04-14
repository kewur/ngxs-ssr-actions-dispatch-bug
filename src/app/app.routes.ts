import { Routes } from '@angular/router';
import {TestRouteComponent} from './core/components/test-route/test-route.component';
import {MetaResolver} from './meta-resolver';

export const routes: Routes = [
  {
    path: 's',
    component: TestRouteComponent,
    resolve: {
      meta: MetaResolver,
    }
  }
];
