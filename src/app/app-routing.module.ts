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

const routes: Routes = [
  {path: 'process', component: MenuComponent},
  {path: 'senasa', component: SenasaComponent},
  {path: 'products', component: ProductComponent},
  {path: 'inal', component: InalComponent},
  {path: 'drivers', component: DriverComponent},
  {path: 'trucks', component: TruckComponent},
  {path: 'orders', component: OrderComponent},
  {path: 'suppliers', component: SupplierComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
