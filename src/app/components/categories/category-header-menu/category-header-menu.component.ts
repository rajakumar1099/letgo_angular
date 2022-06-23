import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Features } from 'src/app/core/features';
import { getCategories } from '../core/store/categories.selector';
import { Categories, CategoriesState } from '../core/types/categories.types';

@Component({
  selector: 'app-category-header-menu',
  templateUrl: './category-header-menu.component.html',
  styleUrls: ['./category-header-menu.component.scss'],
})
export class CategoryHeaderMenuComponent implements OnInit {
  public categories$!: Observable<Categories[] | null>;

  constructor(
    private store: Store<{ [Features.Categories]: CategoriesState }>
  ) {}

  ngOnInit(): void {
    this.categories$ = this.store.select(getCategories);
  }
}
