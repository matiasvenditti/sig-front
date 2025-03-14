import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NbThemeModule,
  NbStepperModule,
  NbLayoutModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbSidebarModule,
  NbSelectModule,
  NbIconModule,
  NbDialogModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbBadgeModule,
  NbTreeGridModule,
  NbToastrModule,
  NbMenuModule
} from '@nebular/theme';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SenasaComponent } from './senasa/senasa.component';
import { CreateSenasaComponent } from './senasa/create-senasa/create-senasa.component';
import { HttpClientModule } from '@angular/common/http';
import { DeleteSenasaComponent } from './senasa/delete-senasa/delete-senasa.component';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { InalComponent } from './inal/inal.component';
import { CreateInalComponent } from './inal/create-inal/create-inal.component';
import { DeleteInalComponent } from './inal/delete-inal/delete-inal.component';
import { DriverComponent } from './driver/driver.component';
import { CreateDriverComponent } from './driver/create-driver/create-driver.component';
import { DeleteDriverComponent } from './driver/delete-driver/delete-driver.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { UpdateDriverComponent } from './driver/update-driver/update-driver.component';
import { UpdateSenasaComponent } from './senasa/update-senasa/update-senasa.component';
import { UpdateInalComponent } from './inal/update-inal/update-inal.component';
import { TruckComponent } from './truck/truck.component';
import { CreateTruckComponent } from './truck/create-truck/create-truck.component';
import { UpdateTruckComponent } from './truck/update-truck/update-truck.component';
import { DeleteTruckComponent } from './truck/delete-truck/delete-truck.component';
import { OrderComponent } from './order/order.component';
import { CreateOrderComponent } from './order/create-order/create-order.component';
import { UpdateOrderComponent } from './order/update-order/update-order.component';
import { DeleteOrderComponent } from './order/delete-order/delete-order.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CreateSupplierComponent } from './supplier/create-supplier/create-supplier.component';
import { UpdateSupplierComponent } from './supplier/update-supplier/update-supplier.component';
import { DeleteSupplierComponent } from './supplier/delete-supplier/delete-supplier.component';
import { ReceptionComponent } from './reception/reception.component';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { DocumentationModalComponent } from './documentation-modal/documentation-modal.component';
import { NoDocumentationModalComponent } from './no-documentation-modal/no-documentation-modal.component';
import { QualityComponent } from './quality/quality.component';
import { DistributionComponent } from './distribution/distribution.component';
import { DistributionModalComponent } from './distribution-modal/distribution-modal.component';
import { StockComponent } from './stock/stock.component';
import { SendStockModalComponent } from './send-stock-modal/send-stock-modal.component';
import { NonConformityModalComponent } from './non-conformity-modal/non-conformity-modal.component';
import { NonConformityDocumentationComponent } from './non-conformity-documentation/non-conformity-documentation.component';
import { NonConformityQualityComponent } from './non-conformity-quality/non-conformity-quality.component';
import { DeleteClaimModalComponent } from './delete-claim-modal/delete-claim-modal.component';
import { NoQualityModalComponent } from './no-quality-modal/no-quality-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SidebarComponent,
    SenasaComponent,
    CreateSenasaComponent,
    DeleteSenasaComponent,
    ProductComponent,
    CreateProductComponent,
    DeleteProductComponent,
    InalComponent,
    CreateInalComponent,
    DeleteInalComponent,
    DriverComponent,
    CreateDriverComponent,
    DeleteDriverComponent,
    UpdateProductComponent,
    UpdateDriverComponent,
    UpdateSenasaComponent,
    UpdateInalComponent,
    TruckComponent,
    CreateTruckComponent,
    UpdateTruckComponent,
    DeleteTruckComponent,
    OrderComponent,
    CreateOrderComponent,
    UpdateOrderComponent,
    DeleteOrderComponent,
    SupplierComponent,
    CreateSupplierComponent,
    UpdateSupplierComponent,
    DeleteSupplierComponent,
    ReceptionComponent,
    OrderModalComponent,
    DocumentationComponent,
    DocumentationModalComponent,
    NoDocumentationModalComponent,
    QualityComponent,
    DistributionComponent,
    DistributionModalComponent,
    StockComponent,
    SendStockModalComponent,
    NonConformityModalComponent,
    NonConformityDocumentationComponent,
    NonConformityQualityComponent,
    DeleteClaimModalComponent,
    NoQualityModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NbStepperModule,
    NbButtonModule,
    NbCardModule,
    NbEvaIconsModule,
    NbInputModule,
    NbSelectModule,
    NbIconModule,
    NbDialogModule.forRoot(),
    ReactiveFormsModule,
    NbThemeModule.forRoot({name: 'default'}),
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot(),
    NbTreeGridModule,
    NbBadgeModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbMenuModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateSenasaComponent,
    DeleteSenasaComponent,
    UpdateSenasaComponent,
    CreateProductComponent,
    DeleteProductComponent,
    UpdateProductComponent,
    CreateInalComponent,
    DeleteInalComponent,
    UpdateInalComponent,
    CreateDriverComponent,
    DeleteDriverComponent,
    UpdateDriverComponent,
    CreateTruckComponent,
    DeleteTruckComponent,
    UpdateTruckComponent,
    CreateOrderComponent,
    DeleteOrderComponent,
    UpdateOrderComponent,
    CreateSupplierComponent,
    DeleteSupplierComponent,
    UpdateSupplierComponent,
    OrderModalComponent,
    DocumentationModalComponent,
    NoDocumentationModalComponent,
    DistributionModalComponent,
    SendStockModalComponent,
    NonConformityModalComponent,
    DeleteClaimModalComponent,
    NoQualityModalComponent
  ]
})
export class AppModule { }
