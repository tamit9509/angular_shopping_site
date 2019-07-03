import { APIS } from './../../../constants/apis.constants';
import { HttpService } from 'src/app/core/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  products;
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getData(APIS.Cart).subscribe((result) => {
      this.products = result.data.items;
      console.log('cart', result);
    });
  }
}
