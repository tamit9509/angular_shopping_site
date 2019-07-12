import { APIS } from './../../constants/apis.constants';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products;
  constructor(private httpService: HttpService, private alertService: AlertService) { }

  ngOnInit() {
    this.httpService.getData(APIS.GetAdminProducts).subscribe((result) => {
      this.products = result.data.items;
    });
  }
  deleteProduct(product) {
    this.httpService
      .deleteData(`${APIS.AdminProduct}/${product.id}`).subscribe((result) => {
        this.alertService.successToast(result.message);
        const index = this.products.findIndex((obj) => {
          return obj.id === result.data.id;
        });
        console.log(index);

        (index >= 0) ? this.products.splice(index, 1) : '';
      });
  }
}
