import { Component } from '@angular/core';
import {Store} from '@ngxs/store';
import {CurrentUserModel, CurrentUserState, RequestUserTasks} from './state';
import {Observable} from 'rxjs';
import {AsyncPipe, JsonPipe} from '@angular/common';

@Component({
    selector: 'app-root',
  imports: [JsonPipe, AsyncPipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ngxs-ssr-bug';
  user$: Observable<CurrentUserModel>;

  constructor(
    private readonly store: Store){

    this.user$ = this.store.select<CurrentUserModel>(CurrentUserState.currentUser);

    this.store.dispatch(new RequestUserTasks(2));
  }
}
