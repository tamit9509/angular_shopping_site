import { APIS } from './../../../constants/apis.constants';
import { HttpService } from 'src/app/core/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidationErrors } from './../../../constants/app.constants';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProduct: FormGroup;
  validationMsg = FormValidationErrors;
  submitted: boolean;
  productID;
  product;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private router: Router
  ) {
    this.successHandler = this.successHandler.bind(this);
    this.errorHandller = this.errorHandller.bind(this);
  }

  ngOnInit() {
    this.formInit();
    this.productID = this.activatedRoute.snapshot.params.id;
    if (this.productID) {
      this.httpService
        .getData(`${APIS.Product}/${this.productID}`)
        .subscribe((result: any) => {
          this.product = result.data;
          this.setForm(this.product);
        }, this.errorHandller);
    }
  }
  formInit() {
    this.addProduct = this.formBuilder.group({
      title: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      description: ['']
    });
  }
  setForm(obj: any = {}) {
    this.controls.title.setValue(obj.title);
    this.controls.imageUrl.setValue(obj.imageUrl);
    this.controls.price.setValue(obj.price);
    this.controls.description.setValue(obj.description);
  }

  onSubmit() {
    this.submitted = true;
    if (this.addProduct.invalid) {
      return;
    }
    if (this.productID) {
      this.httpService.putData(`${APIS.AdminProduct}/${this.productID}`, this.addProduct.value)
        .subscribe(this.successHandler, this.errorHandller);
      return;
    }
    this.httpService.postData(APIS.AdminProduct, this.addProduct.value).subscribe(this.successHandler, this.errorHandller);
  }

  get controls() {
    return this.addProduct.controls;
  }
  successHandler(result) {
    console.log('asdcvasdvasdvsdvavsdfvasdvasd');
    this.router.navigate(['/admin']);
  }
  errorHandller(error) {
    console.log('error');
    console.log(error);
  }
}
