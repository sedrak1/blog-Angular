import { Query } from '@datorama/akita';
import { UserState, UserStore } from "./user.store";
import {Injectable} from "@angular/core";
import {tap} from "rxjs";
import {UserService} from "./user-store.service.js";

@Injectable({providedIn: 'root'})

export class UserQuery extends Query<UserState> {
  constructor(protected override store: UserStore, private userStoreService: UserService) {
    super(store);
    this.userStoreService.getUser().subscribe()
  }
}
