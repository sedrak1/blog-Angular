import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PostsService} from "../posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Post} from "../../../post";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {
  post: Post = {tile: "", body: "", id: 1}


  constructor(private postsService: PostsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getPost()
  }

  getPost() {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.postsService.getPost(id).subscribe(post => {
      this.post = post;
    })
  }

  onSubmit(postForm:FormGroup){
    this.postsService.editPost(postForm.value).subscribe(()=>{this.router.navigate(['/posts'])})
  }

}
