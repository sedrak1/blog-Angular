import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormControl} from '@angular/forms';
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
  comment!: Comment;


  commentValue ='fgh'
  updatedComment = ''
  toggle: boolean= false
  firstTime: boolean = true
  readonly: boolean = true


  constructor(private postsService: PostsService) {
    console.log(this.comment);
    
   }

  ngOnInit(): void {
  }




  
  editComment(id : number, ){
    this.postsService.editComment(this.post.id, {body: this.commentValue, id:id}).subscribe()
    this.readonly = true
    console.log(this.updatedComment);
    
  }

  getComment(id: number){
    
    this.readonly = false
    this.postsService.getComment(this.post.id, id).subscribe(comment=>{console.log(comment);
    })
  }



}
