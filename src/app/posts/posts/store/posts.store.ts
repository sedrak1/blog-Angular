import { Store, StoreConfig } from '@datorama/akita';
import {Post} from "../../../../post";

export interface PostState {
  postsArr: Post[]
}

export function createInitialState(): PostState {
  return {
    postsArr: [],
  };
}

@StoreConfig({ name: 'session' })
export class PostStore extends Store<PostState> {
  constructor() {
    super(createInitialState());
  }
}
