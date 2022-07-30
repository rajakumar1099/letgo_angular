import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product_uid: any | undefined;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.product_uid = this.route.snapshot.params['product_uid'];
  }
}
