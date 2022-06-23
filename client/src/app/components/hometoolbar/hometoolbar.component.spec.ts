import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HometoolbarComponent } from './hometoolbar.component';

describe('HometoolbarComponent', () => {
  let component: HometoolbarComponent;
  let fixture: ComponentFixture<HometoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HometoolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HometoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
