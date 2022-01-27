import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {filter, Observable, of} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {PostsService} from "./posts.service";
import {UserService} from "../auth/store/user-store.service.js";

@Injectable({
  providedIn: 'root'
})
export class PostGuard implements CanActivate {
  constructor( private postService: PostsService, private userService: UserService ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.postService.me()
      .pipe(
        map((user) => {
          this.userService.updateStore(user)
          return true;
        }),
        catchError(() => {
          return of(false)
        }),
      )
  }

}
