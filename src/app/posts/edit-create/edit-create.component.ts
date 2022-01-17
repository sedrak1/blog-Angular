import {Component, Input, OnInit} from '@angular/core';
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
  type!:string;

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
  ) {
  }

  ngOnInit(): void {
    if (this.type === 'edit'){
      this.getPost()
    }
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

  createPost(): void{
    this.postsService.createPost({...this.postForm.value, }).subscribe((p:Post)=>{
      this.router.navigate(['/posts'])
    },(e)=> {
      console.log("error code", e.status)
    })
  }

  onSubmit(){
    if (this.type === 'edit'){
      this.updatePost()
    }else{
      this.createPost()
    }
  }
}
