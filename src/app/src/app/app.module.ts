import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FilterPipe } from './Pipe/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './UserBack/user-list/user-list.component';
import { ParameterComponent } from './Parameter/parameter/parameter.component';
import { EditParamComponent } from './Parameter/edit-param/edit-param.component';
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
import { ForgotPasswordFormComponent } from './forgot-password-form/forgot-password-form.component';
import {AuthInterceptor} from "./Account/login/auth.interceptor";
import {ConfirmationDialogComponent} from "./UserBack/confirmation-dialog/confirmation-dialog.component";
import { BrowserModule } from '@angular/platform-browser';
import {UpdateStaffComponent} from "./UserBack/update-staff/update-staff.component";
import {UpdateUserGmComponent} from "./UserBack/update-user/update-user-gm.component";
import {PasswordResetInitComponent} from "./password-reset/init/password-reset-init.component";
import {PasswordResetFinishComponent} from "./password-reset/finish/password-reset-finish.component";
import { EditManagerComponent } from './Branch/edit-manager/edit-manager.component';
import { EditApprovalLimitComponent } from './Branch/edit-approval-limit/edit-approval-limit.component';

// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavbarComponent,
    FilterPipe,
    UserListComponent,
    ParameterComponent,
    EditParamComponent,
    AddBranchComponent,
    ListCcComponent,
    AddCostCenterComponent,
    EditCCComponent,
    LoginComponent,
    SignupComponent,
    LayoutComponent,
    ForgotPasswordFormComponent,
    ConfirmationDialogComponent,
    UpdateStaffComponent,
    UpdateUserGmComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    EditManagerComponent,
    EditApprovalLimitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatRadioModule,
    TranslateModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: TranslateLoader, useFactory: httpTranslateLoaderFactory, deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
