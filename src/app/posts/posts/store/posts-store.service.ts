import {PostsStore} from "./posts.store";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {PostsService} from "../../posts.service";
import {tap} from "rxjs";
import {Post} from "../../../../post";

import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})

export class PostsStoreService {

  constructor(
    private postsStore: PostsStore,
    private http: HttpClient,
    private postsService: PostsService
  ) {
  }

  getPosts() {
    return this.postsService.getPosts()
      .pipe(
        tap(val => this.postsStore.add(val))
      )
  }

  // getUser() {
  //   this.postsService.getUser().pipe(
  //     tap(val => {
  //       // @ts-ignore
  //       this.postsStore.add(val)}
  //   )).subscribe()
  // }

}
