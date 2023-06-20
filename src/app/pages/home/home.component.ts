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
  searchKey: string = '';
  public filterCategory: any;

  constructor(private api: ApiService, private cartservice: CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((e: any) => {
        if (
          e.category === "women's clothing" ||
          e.category === "men's clothing"
        ) {
          e.category = 'fashion';
        }
        Object.assign(e, { quantity: 1, total: e.price });
      });
    });
    this.cartservice.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  addToCart(item: any) {
    this.cartservice.addtoCart(item);
  }

  filter(category: string) {
    if (category === 'all') {
      this.filterCategory = this.productList;
    } else {
      this.filterCategory = this.productList.filter((e: any) => {
        return e.category == category;
      });
    }
  }
}
