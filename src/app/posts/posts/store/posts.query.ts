import { QueryEntity } from '@datorama/akita';
import {PostsStore, PostsState,} from "./posts.store";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})

export class PostsQuery extends QueryEntity<PostsState> {
  constructor(protected store: PostsStore) {
    super(store);
  }

}
