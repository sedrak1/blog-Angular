import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts/posts.component';
import { CommentComponent } from './comment/comment.component';
import {PostGuard} from "./post.guard";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { CreatePostComponent } from './create-post/create-post.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpConfigInterceptor} from "../interceptor/httpconfig.interceptor";
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostCardComponent } from './post-card/post-card.component';
import { EditCreateComponent } from './edit-create/edit-create.component';


@NgModule({
    declarations: [
        PostsComponent,
        CommentComponent,
        CreatePostComponent,
        EditPostComponent,
        PostCardComponent,
        EditCreateComponent
    ],
    exports: [
        PostsComponent
    ],
    imports: [
      CommonModule,
      PostsRoutingModule,
      ReactiveFormsModule,
      FormsModule
    ],
    providers: [PostGuard, { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }]
})
export class PostsModule { }
