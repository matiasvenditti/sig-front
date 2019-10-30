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
    UpdateProductComponent
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
    NbThemeModule.forRoot({name: 'dark'}),
    NbSidebarModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbToastrModule.forRoot(),
    NbTreeGridModule,
    NbLayoutModule,
    NbCheckboxModule,
    NbMenuModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateSenasaComponent,
    DeleteSenasaComponent,
    CreateProductComponent,
    DeleteProductComponent,
    UpdateProductComponent,
    CreateInalComponent,
    DeleteInalComponent,
    CreateDriverComponent,
    DeleteDriverComponent
  ]
})
export class AppModule { }
