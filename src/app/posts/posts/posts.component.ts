import {Component, HostListener, OnInit} from '@angular/core';
import { PostsService } from "../posts.service";
import {Post} from "../../../post";
import {User} from "../../../user";
import {Comment} from "../../../comment";
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime, filter, fromEvent, Observable, ObservableInput, switchMap, take, tap} from "rxjs";
import {map} from "rxjs/operators";
import {query} from "@angular/animations";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  postsArr: Post[] = []
  bool: boolean = true
  scroll = fromEvent(document,'scroll');
  scrollCount = 0
  user: User={
    id: 1,
    firstname: 'User',
    lastname: '',
    email: '',
    password: '',
    api_token: '',
  }
  searchKey: string = ''


  constructor(private postsService: PostsService, private router: Router, private activatedRoute: ActivatedRoute ) {
  }

  ngOnInit(): void {
    this.handleScroll()
    this.getUser()
    this.getPosts().subscribe()
    this.handleSearch(this.searchKey)
  }

  handleScroll(){
    this.scroll.pipe(
      filter(()=>{return window.innerHeight + window.scrollY  >= document.body.offsetHeight - 100 }),
      filter(()=>{return this.scrollCount < 5 }),
      switchMap( () => this.getPosts()),
      tap(()=>{this.scrollCount++}),
    ).subscribe()
  }

  handleSearch(searchKey: string){
    // this.router.navigate([], {
    //   queryParamsHandling: 'merge',
    //   queryParams: { searchKey: encodeURI(this.searchKey) },
    // });

    this.activatedRoute.queryParams.pipe(
      map(val=>{
        console.log(val['searchKey'])})
    ).subscribe();
    return this.postsService.search(searchKey).pipe(
      map((posts:Post[])=>{return this.postsArr=posts})
    ).subscribe()
  }

  getPosts(): Observable<any>{
    return this.postsService.getPosts().pipe(
      tap((arr)=>{this.postsArr.push(...arr)}))
  }

  logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/signIn'])
  }

  getUser(){
    this.postsService.getUser().pipe(
      tap((u)=>{
        this.user=u
      })
    ).subscribe()
  }
}
