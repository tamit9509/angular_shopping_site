import { PageNotFoundComponent } from './share/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from './share/share.module';

const routes: Routes = [
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: 'shop', loadChildren: './modules/shop/shop.module#ShopModule' },
  { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ShareModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
