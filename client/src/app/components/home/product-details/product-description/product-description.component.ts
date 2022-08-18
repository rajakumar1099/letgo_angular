import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.scss']
})
export class ProductDescriptionComponent implements OnInit {
  @Input() product_description: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
