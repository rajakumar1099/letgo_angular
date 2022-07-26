import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-carousel',
  templateUrl: './home-carousel.component.html',
  styleUrls: ['./home-carousel.component.scss'],
})
export class HomeCarouselComponent implements OnInit {
  public slides: any;
  constructor() {}

  ngOnInit(): void {
    this.slides = [
      {
        id: 1,
        image:
          'https://joysale.appkodes.in/frontend/web/media/banners/6398-9522634676.png',
      },
      {
        id: 2,
        image:
          'https://joysale.appkodes.in/frontend/web/media/banners/3633-2642359067.png',
      },
      {
        id: 3,
        image:
          'https://joysale.appkodes.in/frontend/web/media/banners/6398-9522634676.png',
      },
      {
        id: 4,
        image:
          'https://joysale.appkodes.in/frontend/web/media/banners/4591-5177441769.png',
      },
    ];
  }
}
