import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../post";
import {PostsService} from "../posts.service";
import {User} from "../../../user";
import {Router} from "@angular/router";
import {debounce} from "rxjs";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input()
  post!: Post
  @Input()
  user!: User

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
  }

  deletePost(id:number){
    this.postsService.deletePost(id).subscribe(()=>{location.reload()})
  }
}
