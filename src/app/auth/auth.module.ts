import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {AuthGuard} from "./auth.guard";
import {AppModule} from "../app.module";
import {ValidationLabelDirective} from "../error-manager.directive";


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    ValidationLabelDirective
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserModule,
    ],
  providers: [AuthGuard],
})
export class AuthModule { }
