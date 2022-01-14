import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const path = localStorage.getItem('token') ? '/posts': '/signIn'

const routes: Routes = [
  { path: '', redirectTo: path, pathMatch: 'full' },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
