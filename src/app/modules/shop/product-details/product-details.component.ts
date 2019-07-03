import { APIS } from './../../../constants/apis.constants';
import { HttpService } from './../../../core/services/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId;
  product;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.errorHandler = this.errorHandler.bind(this);
  }

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params.id;
    this.httpService
      .getData(`${APIS.Product}/${this.productId}`)
      .subscribe((result) => {
        this.product = result.data;
      }, this.errorHandler);
  }
  errorHandler(error) {
    console.log(error);
  }
}
