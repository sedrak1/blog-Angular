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

  commentsArr: Comment[] = []
  commentValue = ''

  constructor(private postsService: PostsService, private router: Router ) { }

  ngOnInit(): void {
    this.getPosts()
  }

  getPosts(){
    this.postsService.getPosts().subscribe(arr=>{this.postsArr=arr})
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/signIn'])
  }

}
