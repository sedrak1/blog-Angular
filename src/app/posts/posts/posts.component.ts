import {Component, OnInit} from '@angular/core';
import { PostsService } from "../posts.service";
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

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postsArr: Post[] = []
  bool: boolean = true
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

  constructor(private postsService: PostsService, private router: Router, private activatedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.getUser()

    this.merge.pipe(
      switchMap(()=>this.getPosts()),
      tap(()=>{
        this.scrollCount ++
      }),
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

  handleScroll(){
    this.merge.subscribe()
  }

  getPosts(searchKey:string = ''): Observable<any>{
    return this.postsService.getPosts(searchKey).pipe(
      tap((arr)=>{
        this.getData=false
        this.postsArr.push(...arr)}))
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/signIn'])
  }

  getUser(){
    this.postsService.getUser().pipe(
      tap((u)=>{
        this.user = u
      })
    ).subscribe()
  }
}
