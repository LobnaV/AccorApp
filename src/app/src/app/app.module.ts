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
import { FilterPipe } from './Pipe/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonToCsvComponent } from './Test/json-to-csv/json-to-csv.component';
import { UserListComponent } from './UserBack/user-list/user-list.component';
import { ParameterComponent } from './Parameter/parameter/parameter.component';
import { AddUserComponent } from './UserBack/add-user/add-user.component';
import { EditUserComponent } from './UserBack/edit-user/edit-user.component';
import { AddParamComponent } from './Parameter/add-param/add-param.component';
import { EditParamComponent } from './Parameter/edit-param/edit-param.component';
import { CompanyListComponent } from './Company/company-list/company-list.component';
import { EditCompanyComponent } from './Company/edit-company/edit-company.component';
import { AddCompanyComponent } from './Company/add-company/add-company.component';
import { ListBranchComponent } from './Branch/list-branch/list-branch.component';
import { AddBranchComponent } from './Branch/add-branch/add-branch.component';
import { ListCcComponent } from './CostCenter/list-cc/list-cc.component';
import { AddCostCenterComponent } from './CostCenter/add-cost-center/add-cost-center.component';
import { EditCCComponent } from './CostCenter/edit-cc/edit-cc.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MainPageComponent,
    UpdateComponent,
    UploadCsvToJsonComponent,
    NavbarComponent,
    FilterPipe,
    JsonToCsvComponent,
    UserListComponent,
    CompanyListComponent,
    ParameterComponent,
    AddUserComponent,
    EditUserComponent,
    AddParamComponent,
    EditParamComponent,
    EditCompanyComponent,
    AddCompanyComponent,
    ListBranchComponent,
    AddBranchComponent,
    ListCcComponent,
    AddCostCenterComponent,
    EditCCComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
