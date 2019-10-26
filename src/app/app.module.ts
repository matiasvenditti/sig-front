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
  NbTreeGridModule,
  NbMenuModule
} from '@nebular/theme';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SenasaComponent } from './senasa/senasa.component';
import { CreateSenasaComponent } from './senasa/create-senasa/create-senasa.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SidebarComponent,
    SenasaComponent,
    CreateSenasaComponent
  ],
  imports: [
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
    NbThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbTreeGridModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateSenasaComponent
  ]
})
export class AppModule { }
