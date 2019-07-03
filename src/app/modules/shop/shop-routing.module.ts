import { ProductDetailsComponent } from './product-details/product-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { RouterModule, Routes } from '@angular/router';


export const shopRoutes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'product-detail/:id', component: ProductDetailsComponent },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersModule' },
  { path: 'cart', loadChildren: './cart/cart.module#CartModule' }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(shopRoutes)
  ],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
