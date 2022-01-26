import { Query } from '@datorama/akita';
import { PostStore, PostState } from './posts.store';

export class PostsQuery extends Query<PostState> {
  allState$ = this.select();
  isLoggedIn$ = this.select(state => !!state.postsArr);
  selectName$ = this.select('postsArr');
  constructor(protected override store: PostStore) {
    super(store);
  }
}
