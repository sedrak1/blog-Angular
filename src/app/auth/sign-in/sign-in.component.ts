import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../../../user";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm = this.fb.group({})
  user: User = { firstname: '', lastname: '', password: '', email: '', id: 0, api_token: ''};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {

  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.initForm()
    // this.authService.isAuthenticated()
  }

  login(): void{

    this.authService.login({...this.loginForm.value}).subscribe((u)=>{
      this.user = u
      localStorage.setItem('token', this.user.api_token)
      this.router.navigate(["/posts"])
      console.log(this.user.api_token)

    },(e)=> {
      console.log(e.status)
    })
  }

  onSubmit(){
    this.login()
  }

}
