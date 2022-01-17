import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../post";
import {PostsService} from "../posts.service";
import {User} from "../../../user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input()
  post!: Post
  user: User={
    id: 1,
    firstname: 'U',
    lastname: '',
    email: '',
    password: '',
    api_token: '',
  }
  constructor(private postsService: PostsService, private router: Router) { }

  ngOnInit(): void {
    this.getUser()
  }

  deletePost(id:number){
    this.postsService.deletePost(id).subscribe(()=>{location.reload()})
  }

  getUser(){
    this.postsService.getUser().subscribe(u=>{this.user=u})
  }
}
