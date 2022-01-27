import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Post} from "../../../post";
import {PostsStoreService} from "../posts/store/posts-store.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {

  post: Post= {body:'',tile:'', id:1}

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storeService: PostsStoreService,
  ) {}

  ngOnInit(): void {
  }

  onSubmit(postForm: FormGroup): void{
    this.storeService.createPost({...postForm.value})
      .pipe(
        tap(()=>this.router.navigate((['/posts'])))
      ).subscribe()
  }
}
