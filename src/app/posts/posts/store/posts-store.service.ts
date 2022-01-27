import {PostsStore} from "./posts.store";
import {HttpClient} from "@angular/common/http";
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
  ) {}

  getPosts() {
    return this.postsService.getPosts()
      .pipe(
        tap(val => this.postsStore.set(val))
      )
  }

  createPost(post: Post) {
    return this.postsService.createPost(post)
      .pipe(
        tap(val => this.postsStore.add(val))
      )
  }

  getPost(id: number) {
    return this.postsService.getPost(id)
  }

  editPost(post:Post) {
    return this.postsService.editPost(post)
      .pipe(
        tap(val => this.postsStore.update(post.id,val))
      )
  }
}
