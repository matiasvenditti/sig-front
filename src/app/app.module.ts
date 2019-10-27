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
  NbDatepickerModule,
  NbTreeGridModule,
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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SidebarComponent,
    SenasaComponent,
    CreateSenasaComponent,
    DeleteSenasaComponent
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
    NbTreeGridModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateSenasaComponent,
    DeleteSenasaComponent
  ]
})
export class AppModule { }
