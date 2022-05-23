import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './User/list/list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UpdateComponent } from './User/update/update.component';
import { UploadCsvToJsonComponent } from './Test/upload-csv-to-json/upload-csv-to-json.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MainPageComponent,
    UpdateComponent,
    UploadCsvToJsonComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
