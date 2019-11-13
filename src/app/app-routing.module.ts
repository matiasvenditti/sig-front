import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SenasaComponent } from './senasa/senasa.component';
import { ProductComponent } from './product/product.component';
import { InalComponent } from './inal/inal.component';
import { DriverComponent } from './driver/driver.component';
import { TruckComponent } from './truck/truck.component';
import { OrderComponent } from './order/order.component';
import {SupplierComponent} from './supplier/supplier.component';
import {NonConformityDocumentationComponent} from './non-conformity-documentation/non-conformity-documentation.component';
import {NonConformityQualityComponent} from './non-conformity-quality/non-conformity-quality.component';

const routes: Routes = [
  {path: 'process', component: MenuComponent},
  {path: 'senasa', component: SenasaComponent},
  {path: 'products', component: ProductComponent},
  {path: 'inal', component: InalComponent},
  {path: 'drivers', component: DriverComponent},
  {path: 'trucks', component: TruckComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'suppliers', component: SupplierComponent},
  {path: 'non-conformity-documentation', component: NonConformityDocumentationComponent},
  {path: 'non-conformity-quality', component: NonConformityQualityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
