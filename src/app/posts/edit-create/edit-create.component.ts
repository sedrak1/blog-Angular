import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../post";
import {FormBuilder, Validators} from "@angular/forms";
import {User} from "../../../user";
import {UserQuery} from "../../auth/store/user.query";
import {tap} from "rxjs";

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

  postForm = this.fb.group({
    title: this.fb.control("", Validators.minLength(5)),
    body: this.fb.control("", Validators.minLength(5)),
    id: this.fb.control("",),
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
    private fb: FormBuilder,
    private userQuery: UserQuery
  ) {}

  ngOnInit(): void {
    this.getUser()
    setTimeout(()=>{this.initForm()},1000)
  }

  initForm(){
    this.postForm = this.fb.group({
      title: this.fb.control(this.post.tile, Validators.minLength(5)),
      body: this.fb.control(this.post.body, Validators.minLength(5)),
      id: this.fb.control(this.post.id),
    })
  }

  getUser(){
    this.userQuery.select()
      .pipe(tap(val => this.user = val)).subscribe()
  }

  onSubmit(){
    this.submitFunc.emit(this.postForm)
  }
}
