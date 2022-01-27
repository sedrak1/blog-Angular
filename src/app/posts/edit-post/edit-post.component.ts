import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../post";
import {FormGroup} from "@angular/forms";
import {PostsStoreService} from "../posts/store/posts-store.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {

  post: Post = {tile: "", body: "", id: 1}

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: PostsStoreService
  ) {}

  ngOnInit(): void {
    this.getPost()
  }

  getPost() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.storeService.getPost(id)
      .pipe(
        tap(post => this.post = post)
      ).subscribe()
  }

  onSubmit(postForm:FormGroup){
    this.storeService.editPost(postForm.value)
      .pipe(
        tap(() => this.router.navigate(['/posts']))
      ).subscribe()
  }
}
