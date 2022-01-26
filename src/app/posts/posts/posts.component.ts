import {Component, OnInit} from '@angular/core';
import {Post} from "../../../post";
import {User} from "../../../user";
import {ActivatedRoute, Router} from "@angular/router";
import {
  filter,
  fromEvent,
  merge,
  Observable,
  switchMap,
  tap
} from "rxjs";
import {PostsQuery} from "./store/posts.query";
import {PostsStoreService} from "./store/posts-store.service";
import {UserQuery} from "../../auth/store/user.query";
import {UserState} from "../../auth/store/user.store";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
  postsArr: Post[] = []
  scroll = fromEvent(document,'scroll');
  scrollCount = 1
  user: User={
    id: 1,
    firstname: 'User',
    lastname: '',
    email: '',
    password: '',
    api_token: '',
  }
  searchKey!: string;
  getData:boolean = false

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postsQuery: PostsQuery,
    private storeService: PostsStoreService,
    private userQuery: UserQuery,

    ) {
  }

  ngOnInit(): void {
    this.storeService.getPosts().subscribe()

    this.getUser()
    this.merge.pipe(
      switchMap(()=>this.getPosts()),
      tap(()=>this.scrollCount ++),
    ).subscribe()
  }

  scrollObs =  this.scroll.pipe(
    filter(()=> window.innerHeight + window.scrollY  + 200 >= document.body.offsetHeight ),
    filter(()=> this.scrollCount < 15 ),
    filter(()=> !this.getData),
    tap(()=>{
      this.getData = true
    })
  )

  routeParamsObs = this.activatedRoute.queryParams.pipe(
    tap((val)=>{
      this.searchKey = val['searchKey'] ? val['searchKey'] : ''
      this.postsArr = []
    }))

  merge = merge(this.scrollObs, this.routeParamsObs)

  getPosts(): Observable<Post[]>{
    return this.postsQuery.selectAll()
      .pipe(tap(val => {
        this.getData=false
        this.postsArr.push(...val)
      })
    )
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/signIn'])
  }

  getUser(){
    this.userQuery.select().pipe(
      tap(val=> {this.user = val, console.log(val)})
    ).subscribe()
  }
}
