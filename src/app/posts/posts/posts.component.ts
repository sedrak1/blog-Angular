import { Component, OnInit } from '@angular/core';
import { PostsService } from "../posts.service";
import {Post} from "../../../post";
import {User} from "../../../user";
import {Comment} from "../../../comment";
import {Router} from "@angular/router";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postsArr: Post[] = []
  user: User={
    id: 1,
    firstname: 'U',
    lastname: '',
    email: '',
    password: '',
    api_token: '',
  }
  commentsArr: Comment[] = []
  commentValue = ''

  constructor(private postsService: PostsService, private router: Router ) { }

  ngOnInit(): void {
    this.getPosts()
    this.getUser()
  }

  getPosts(){
    this.postsService.getPosts().subscribe(arr=>{this.postsArr=arr})
  }

  deletePost(id:number){
    this.postsService.deletePost(id).subscribe(()=>{this.getPosts()})
  }

  getUser(){
    this.postsService.getUser().subscribe(u=>{this.user=u})
  }

  getComments(id:number){
    this.postsService.getComments(id).subscribe(arr=>{this.commentsArr=arr, console.log(arr);
    })
  }

  addComment(id: number){    
    this.postsService.addComment(id, {body:this.commentValue, id:1}).subscribe(()=>{this.getComments(id), this.commentValue=''})
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/signIn'])
  }
}
