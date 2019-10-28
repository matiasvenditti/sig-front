import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SenasaComponent } from './senasa/senasa.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {path: 'process', component: MenuComponent},
  {path: 'senasa', component: SenasaComponent},
  {path: 'products', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
