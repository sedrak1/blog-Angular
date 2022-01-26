import { QueryEntity } from '@datorama/akita';
import {PostsStore, PostsState,} from "./posts.store";
import {Post} from "../../../../post";

import {Injectable} from "@angular/core";
import {User} from "../../../../user";
import {tap} from "rxjs";

@Injectable({providedIn: 'root'})

export class PostsQuery extends QueryEntity<PostsState> {
  constructor(protected override store: PostsStore) {
    super(store);
  }
}
