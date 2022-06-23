import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHeaderMenuComponent } from './category-header-menu.component';

describe('CategoryHeaderMenuComponent', () => {
  let component: CategoryHeaderMenuComponent;
  let fixture: ComponentFixture<CategoryHeaderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryHeaderMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
