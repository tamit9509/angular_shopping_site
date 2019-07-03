import { APIS } from './../../constants/apis.constants';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products;
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getData(APIS.GetAdminProducts).subscribe((result) => {
      this.products = result.data.items;
    });
  }
  deleteProduct(product) {
    this.httpService
      .deleteData(`${APIS.AdminProduct}/${product.id}`)
      .subscribe((result) => {
        this.products.find((obj, index) => {
          return obj.id === result.data.id
            ? this.products.splice(index, 1)
            : false;
        });
      });
  }
}
