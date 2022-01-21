import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {User} from "../../user";
import { Router } from "@angular/router";
import {Observable} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiURL;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data',  'accept': 'application/json'}),
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'api/v1/auth/register', user, );
  }

  login(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'api/v1/auth/login', user, );
  }

  me(): Observable<User>{
    return this.http.get<User>(this.url + 'api/v1/me')
  }

}
