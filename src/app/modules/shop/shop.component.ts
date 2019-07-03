import { APIS } from './../../constants/apis.constants';
import { HttpService } from './../../core/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products;
  constructor(private httpService: HttpService) {
    this.errorHandller = this.errorHandller.bind(this);
  }

  ngOnInit() {
    this.httpService.getData(APIS.GetUserProducts).subscribe((result) => {
      this.products = result.data.items;
    }, this.errorHandller);
  }

  addToCart(product) {
    this.httpService
      .postData(`${APIS.Cart}/${product.id}`, {
        price: product.price
      })
      .subscribe((result) => {});
  }
  errorHandller(error) {
    console.log(error);
  }
}
