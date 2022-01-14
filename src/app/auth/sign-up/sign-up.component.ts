
import { Component, OnInit } from '@angular/core';
import {User} from "../../../user";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth.service";
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user: User = { firstname: '', lastname: '', password: '', email: '', id: 0, api_token: ''};
  registerForm = this.fb.group({})


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  initForm(): void {
    this.registerForm = this.fb.group({
      email: [this.user.email, [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname, Validators.required],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.initForm()
  }

  register(): void{

    this.authService.register({...this.registerForm.value}).subscribe((u)=>{
      this.user = u
      console.log(this.user.api_token)
      localStorage.setItem('token', this.user.api_token)

      this.router.navigate(["/posts"])

    }, (e)=>{
      console.log(e.status)
    })
  }

  onSubmit(){
    this.register()

  }


}
