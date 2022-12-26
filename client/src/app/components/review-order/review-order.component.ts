import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { States } from 'src/app/core/features';
import { getProduct } from '../home/core/store/products.selector';
import { ProductState } from '../home/core/types/home.types';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss']
})
export class ReviewOrderComponent implements OnInit {
  public step = 0;
  public productDetails$!: Observable<ProductState>;

  constructor( private store: Store<{
    [States.Product]: ProductState;
  }>) { }

  ngOnInit(): void {
    this.productDetails$ = this.store.select(getProduct);

  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
