import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOverallDetailComponent } from './product-overall-detail.component';

describe('ProductOverallDetailComponent', () => {
  let component: ProductOverallDetailComponent;
  let fixture: ComponentFixture<ProductOverallDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOverallDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductOverallDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
