import { Component, OnInit } from '@angular/core';
import {PostsService} from "../posts.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Post} from "../../../post";
import {Router} from "@angular/router";
import {User} from "../../../user";


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  postForm = this.fb.group({})
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
    private postsService: PostsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.getUser()
  }

  initForm(){
    this.postForm = this.fb.group({
      title: ['', Validators.minLength(5)],
      body: ['', Validators.minLength(5)],
    });
    console.log(this.postForm.value)
  }

  post(): void{
    this.postsService.createPost({...this.postForm.value, }).subscribe((p:Post)=>{
      this.router.navigate(['/posts'])
    },(e)=> {
      console.log("error code", e.status)
    })
  }
  getUser(){
    this.postsService.getUser().subscribe(u=>{this.user=u})
  }

}
