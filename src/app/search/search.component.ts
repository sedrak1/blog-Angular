import { Component, OnInit } from '@angular/core';
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchKey: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  handleSearch(){
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: { searchKey: encodeURI(this.searchKey) },
    });
  }

}
