import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {PostsRoutingModule} from "./posts/posts-routing.module";
import {AuthRoutingModule} from "./auth/auth-routing.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { ValidationLabelDirective } from './error-manager.directive';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PostsModule,
    AuthModule,
    AppRoutingModule,
    PostsRoutingModule,
    AuthRoutingModule,
    FlexLayoutModule
  ],
  providers: [],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
