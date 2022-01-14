import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from "./posts/posts.component";
import {PostGuard} from "./post.guard";
import {CreatePostComponent} from "./create-post/create-post.component";
import {EditPostComponent} from "./edit-post/edit-post.component";

const routes: Routes = [
  {path:"posts", component: PostsComponent, canActivate:[PostGuard]},
  {path:"create-post", component: CreatePostComponent, canActivate:[PostGuard]},
  {path:"posts/:id", component: EditPostComponent, canActivate:[PostGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PostsRoutingModule { }
