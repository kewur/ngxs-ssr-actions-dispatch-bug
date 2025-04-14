import {ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {SetSomeData} from './actions';

@Injectable({ providedIn: 'root' })
export class MetaResolver implements Resolve<boolean> {

  constructor(private readonly store: Store) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<boolean> {
    // Simulate async fetch to Google's homepage
    await fetch('https://www.google.com')
      .then(res => res.text())
      .catch(() => ''); // ignore failure in SSR envs without internet access

    // Now trigger an NGXS dispatch after async delay
    this.store.dispatch(new SetSomeData('This was set in the resolver'));

    return true;
  }
}

