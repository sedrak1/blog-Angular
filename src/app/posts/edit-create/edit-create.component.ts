import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../post";
import {PostsService} from "../posts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../user";

@Component({
  selector: 'app-edit-create',
  templateUrl: './edit-create.component.html',
  styleUrls: ['./edit-create.component.css']
})
export class EditCreateComponent implements OnInit {

  @Input()
  button!:string;

  @Input()
  post!:Post

  @Output() submitFunc = new EventEmitter()

  // post: Post= {tile:'', body:'', id:1}
  postForm = this.fb.group({

    title: this.fb.control("", Validators.minLength(5)),
    body: this.fb.control("", Validators.minLength(5)),
    id: this.fb.control("", Validators.minLength(5)),
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
  ) {
  }

  ngOnInit(): void {

    this.getUser()
    setTimeout(()=>{this.initForm()},1000)
  }

  initForm(){
    this.postForm = this.fb.group({
      title: this.fb.control(this.post.tile, Validators.minLength(5)),
      body: this.fb.control(this.post.body, Validators.minLength(5)),
      id: this.fb.control(this.post.id, Validators.minLength(5)),
    })
  }

  // updatePost(){
  //   console.log(this.postForm.value)
  //   this.postsService.editPost(this.postForm.value).subscribe(()=>{this.router.navigate(['/posts'])})
  // }

  getUser(){
    this.postsService.getUser().subscribe(u=>{this.user=u})
  }



  onSubmit(){
    // console.log(this.demo.emit(this.postForm))
    this.submitFunc.emit(this.postForm)
  }
}
