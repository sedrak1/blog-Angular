import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PostsService} from "../posts.service";
import {Post} from "../../../post";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  post: Post= {body:'',tile:'', id:1}
  constructor(private route:ActivatedRoute, private postsService: PostsService, private fb: FormBuilder, private router: Router)
   {}

  ngOnInit(): void {
  }

  onSubmit(postForm: FormGroup): void{
    this.postsService.createPost({...postForm.value, }).subscribe((p:Post)=>{
      this.router.navigate(['/posts'])
    },(e)=> {
      console.log("error code", e.status)
    })
  }

}
