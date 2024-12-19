import {
  Action,
  Actions,
  ofActionDispatched,
  Selector,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { buffer, debounceTime, map, tap } from 'rxjs/operators';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {isPlatformServer} from '@angular/common';

export const CURRENT_USER_TOKEN = new StateToken<CurrentUserModel>(
  'currentUser'
);

export interface CurrentUserModel {
  displayName: string | null;
  isFetchingTasks: boolean;
}

@State<CurrentUserModel>({
  name: CURRENT_USER_TOKEN,
  defaults: {
    displayName: null,
    isFetchingTasks: false,
  },
})
@Injectable()
export class CurrentUserState {
  private isServer: boolean;
  constructor(
    private readonly store: Store,
    actions$: Actions,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isServer = isPlatformServer(platformId);
    actions$
      .pipe(
        // that are dispatched
        ofActionDispatched(RequestUserTasks),
        // map requests to list of symbols
        map((action: RequestUserTasks) => action.fetchCount),
        // wait 1 second for all requests of the same type dispatched to come in
        buffer(
          actions$.pipe(
            ofActionDispatched(RequestUserTasks),
            debounceTime(1500)
          )
        ),
        map((actions) => actions[actions.length - 1])
      )
      .subscribe((fetchCount) => {
        this.store.dispatch(new FetchUserTasks(fetchCount));
      });
  }

  @Selector([CURRENT_USER_TOKEN])
  static currentUser(state: CurrentUserModel): CurrentUserModel {
    return state;
  }

  @Action(FetchUserTasks)
  public fetchUserTasks(context: StateContext<CurrentUserModel>, { fetchCount }: FetchUserTasks) {
    const state: CurrentUserModel = context.getState();
    if (state.isFetchingTasks) {
      return;
    }

    context.patchState({
      isFetchingTasks: true,
    });
  }
}
export class RequestUserTasks {
  static readonly type = '[USER] RequestUserTasks';

  constructor(public readonly fetchCount: number) {}
}

export class FetchUserTasks {
  static readonly type = '[USER] FetchUserTasks';

  constructor(public readonly fetchCount: number) {}
}
