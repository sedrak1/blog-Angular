import { Query } from '@datorama/akita';
import { UserState, UserStore } from "./user.store";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})

export class UserQuery extends Query<UserState> {
  constructor(protected store: UserStore) {
    super(store);
  }
}
