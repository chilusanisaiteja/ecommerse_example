import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: any;

  constructor(private api: ApiService, private cartservice: CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      this.productList.forEach((e: any) => {
        Object.assign(e, { quantity: 1, total: e.price });
      });
    });
  }

  addToCart(item: any) {
    this.cartservice.addtoCart(item);
  }
}
