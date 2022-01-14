import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../user";
import {HttpClient} from "@angular/common/http";
import { Post } from "../../post";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private url = "https://blog.fifth-llc.com/"
  constructor(private http: HttpClient, private router: Router) { }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url + 'api/v1/post', post, );
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url + 'api/v1/post');
  }

  getPost(id:number): Observable<Post>{
    return this.http.get<Post>(this.url+'api/v1/post/' + id)
  }

  editPost(post: Post): Observable<any> {
    return this.http.put(`${this.url}api/v1/post/${post.id}`, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.url}api/v1/post/${id}`);
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.url + 'api/v1/me');
  }


}
