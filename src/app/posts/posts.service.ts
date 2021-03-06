import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../user';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../post';
import { Comment } from '../../comment';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private url = environment.apiURL;
  constructor(private http: HttpClient) {}

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url + 'api/v1/post', post);
  }

  getPosts(searchKey:string = ''): Observable<Post[]> {
    // @ts-ignore
    return this.http.get<Post[]>((this.url + 'api/v1/post'),searchKey);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(this.url + 'api/v1/post/' + id);
  }

  editPost(post: Post): Observable<any> {
    return this.http.put(`${this.url}api/v1/post/${post.id}`, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.url}api/v1/post/${id}`);
  }

  addComment(postId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url + `api/v1/post/${postId}/comment`, comment);
  }

  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + `api/v1/post/${postId}/comment`);
  }

  getComment(postId: number, id: number): Observable<Comment> {
    return this.http.get<Comment>(this.url + `api/v1/post/${postId}/comment/` + id);
  }

  editComment(postId: number, comment: Comment): Observable<any> {
    return this.http.put(this.url + `api/v1/post/${postId}/comment/${comment.id}`, comment);
  }

  deleteComment(postId: number, id: number): Observable<Comment> {
    return this.http.delete<Comment>(this.url + `api/v1/post/${postId}/comment/${id}`);
  }

  me(): Observable<User>{
    return this.http.get<User>(this.url + 'api/v1/me')
  }

}
