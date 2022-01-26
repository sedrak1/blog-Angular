import { UserStore } from "./user.store";
import {AuthService} from "../auth.service";
import {tap} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})

export class SessionService {
  constructor(private userStore: UserStore, private authService: AuthService) {
  }

  getUser(){
    return this.authService.me()
      .pipe(
        tap(val => {this.userStore.update(val)
          console.log(val)}
        )
      )
  }
}
