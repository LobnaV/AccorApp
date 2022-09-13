import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FilterPipe } from './Pipe/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './UserBack/user-list/user-list.component';
import { ParameterComponent } from './Parameter/parameter/parameter.component';
import { AddUserComponent } from './UserBack/add-user/add-user.component';
import { EditUserComponent } from './UserBack/edit-user/edit-user.component';
import { AddParamComponent } from './Parameter/add-param/add-param.component';
import { EditParamComponent } from './Parameter/edit-param/edit-param.component';
import { ListBranchComponent } from './Branch/list-branch/list-branch.component';
import { AddBranchComponent } from './Branch/add-branch/add-branch.component';
import { ListCcComponent } from './CostCenter/list-cc/list-cc.component';
import { AddCostCenterComponent } from './CostCenter/add-cost-center/add-cost-center.component';
import { EditCCComponent } from './CostCenter/edit-cc/edit-cc.component';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { LoginComponent } from './Account/login/login.component';
import { SignupComponent } from './Account/signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import {AuthInterceptor} from "./Account/login/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavbarComponent,
    FilterPipe,
    UserListComponent,
    ParameterComponent,
    AddUserComponent,
    EditUserComponent,
    AddParamComponent,
    EditParamComponent,
    ListBranchComponent,
    AddBranchComponent,
    ListCcComponent,
    AddCostCenterComponent,
    EditCCComponent,
    LoginComponent,
    SignupComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatRadioModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
