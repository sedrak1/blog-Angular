import { Component, OnInit } from '@angular/core';
import {Post} from "../../../post";
import {PostsService} from "../posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../user";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  post: Post= {tile:'asd', body:'qwewqe', id:1}
  postForm = this.fb.group({
    title: this.fb.control('', Validators.minLength(5)),
    body: this.fb.control('', Validators.minLength(5)),
  })
  user: User={
    id: 1,
    firstname: 'U',
    lastname: '',
    email: '',
    password: '',
    api_token: '',
  }

  constructor(
    private router: Router,
    private postsService:PostsService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPost()
    this.getUser()
  }

  getPost(){
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.postsService.getPost(id).subscribe(post=>{
      this.postForm = this.fb.group({
        title: this.fb.control(post.tile, Validators.minLength(5)),
        body: this.fb.control(post.body, Validators.minLength(5)),
        id:this.fb.control(id)
      })
    })
  }

  updatePost(){
    this.postsService.editPost(this.postForm.value).subscribe(()=>{this.router.navigate(['/posts'])})
  }

  getUser(){
    this.postsService.getUser().subscribe(u=>{this.user=u})
  }

}
