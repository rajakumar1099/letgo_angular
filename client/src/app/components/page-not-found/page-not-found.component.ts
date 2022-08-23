import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routers } from 'src/app/core/common/common.types';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public navigateToHome() {
    this.router.navigate([Routers.PRODUCTS]);
  }

}
