import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Features } from 'src/app/core/features';
import { getCategories } from '../core/store/categories.selector';
import { Categories, CategoriesState } from '../core/types/categories.types';

@Component({
  selector: 'app-category-header',
  templateUrl: './category-header.component.html',
  styleUrls: ['./category-header.component.scss'],
})
export class CategoryHeaderComponent implements OnInit {
  public categories$!: Observable<Categories[] | null>;
  @ViewChild('widgetsContent') widgetsContent!: ElementRef;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;
  isMatMenuOpen = false;

  constructor(
    private store: Store<{ [Features.Categories]: CategoriesState }>
  ) {}

  ngOnInit(): void {
    this.categories$ = this.store.select(getCategories);
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollLeft -= 150;
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollLeft += 150;
  }

  public openCategoryOptions(): void {
    // menu.openMenu();
    // console.log(menu.menuOpened);
    this.trigger?.openMenu();
  }
}
