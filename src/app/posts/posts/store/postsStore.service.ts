import { PostStore } from './posts.store';

export class PostsStoreService {
  constructor(private postsStoreService: PostStore) {}

  updatePostsArr(newArr: string) {
    this.postsStoreService.update({ postsArr: [] });
  }
}
