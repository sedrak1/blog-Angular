import { UserStore } from "./user.store";
import {AuthService} from "../auth.service";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "../../../user";

@Injectable({providedIn: 'root'})

export class UserService {
  constructor(private userStore: UserStore,) {
  }

  updateStore(user: User) : Observable<User>{
    return this.userStore.update( user )
  }
}
