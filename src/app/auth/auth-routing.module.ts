import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {path: "signIn", component: SignInComponent,canActivate:[AuthGuard] },
  {path: "signUp", component: SignUpComponent,canActivate:[AuthGuard] },
  // {path: "", redirectTo: '/posts',pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
