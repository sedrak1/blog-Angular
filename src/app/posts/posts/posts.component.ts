import { Component, OnInit } from '@angular/core';
import { PostsService } from "../posts.service";
import {Post} from "../../../post";
import {User} from "../../../user";
import {Comment} from "../../../comment";
import {Router} from "@angular/router";
import {filter, Observable, take, tap} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postsArr: Post[] = []
  bool: boolean = true

  commentValue = ''

  constructor(private postsService: PostsService, private router: Router ) { }

  ngOnInit(): void {
    let obs = new Observable()
    this.getPosts()
    setTimeout(()=>{this.bool = false},3000)
  }

  getPosts(){
    this.postsService.getPosts().pipe(
      tap((post)=>{
        console.log(post)
        })
    ).subscribe(arr=>{this.postsArr=arr})
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/signIn'])
  }
}
