import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, FormControl, Validators, FormArray} from '@angular/forms';
import { Post } from 'src/post';
import { Comment } from '../../../comment';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input()
  post!: Post;
  @Input()
  commentsArr!: Comment[];

  comment = {body:'', id:1}
  commentValue ='fgh'
  toggle: boolean= false
  firstTime: boolean = true
  isOpened: boolean = false
  commentForm = this.fb.group({
    body: ['', Validators.minLength(5)],
    id: 1,
    commentsArr: this.fb.array([])
  })




  constructor(private postsService: PostsService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  initForm(){
    this.commentForm = this.fb.group({
      body: ['', Validators.minLength(5)],
      id: 1,
      commentsArr: this.commentsFormArray
    })
  }

  initCommentsFormArray(){
    for (let i = 0; i < this.commentsArr.length; i++) {
      this.commentsFormArray.push(this.fb.control(this.commentsArr[i].body));
    }
    console.log()
  }

  editComment(commentId : number, comment:string){
    this.postsService.editComment(this.post.id, {body: comment, id: commentId}).subscribe()
    console.log(commentId, comment);
  }

  getComment(commentId: number){
    this.postsService.getComment(this.post.id, commentId).subscribe(comment=>{console.log(comment);
    })
  }

  addComment(commentId: number){
    this.postsService.addComment(this.post.id, {body:this.commentForm.controls['body'].value, id:commentId}).subscribe(()=>{
      this.commentsFormArray.push(this.fb.control(this.commentForm.value.body))
      this.getComments()
      this.initForm()
      console.log(this.commentsFormArray.value)
    })
  }

  getComments(){
    this.postsService.getComments(this.post.id).subscribe(arr=>{

      this.commentsArr=arr
      if(this.firstTime){
        this.initCommentsFormArray()
        this.firstTime= false
      }else{

      }
    })
  }

  deleteComment(commentId:number, comment: string){
    this.postsService.deleteComment(this.post.id, commentId).subscribe(()=>{
      this.commentsFormArray.removeAt(this.commentsFormArray.value.findIndex((com: string) => com===comment))
      console.log(this.commentsFormArray.value, this.commentsArr)
      this.commentsArr = this.commentsFormArray.value
    })
  }

  get commentsFormArray(): FormArray {
    return this.commentForm.get('commentsArr') as FormArray;
  }

  onToggle(){
  if (this.firstTime){
    this.getComments()
  }
    this.isOpened = !this.isOpened
  }

}
