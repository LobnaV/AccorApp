import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FilterPipe } from './Pipe/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './UserBack/user-list/user-list.component';
import { ParameterComponent } from './Parameter/parameter/parameter.component';
import { EditParamComponent } from './Parameter/edit-param/edit-param.component';
import { AddBranchComponent } from './Branch/add-branch/add-branch.component';
import { ListErrorCcComponent } from './cost-center/list-error-cc/list-error-cc.component';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { LoginComponent } from './Account/login/login.component';
import { SignupComponent } from './Account/signup/signup.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { AuthInterceptor } from './Account/login/auth.interceptor';
import { ConfirmationDialogComponent } from "./UserBack/confirmation-dialog/confirmation-dialog.component";
import { BrowserModule } from '@angular/platform-browser';
import { UpdateStaffComponent} from './UserBack/update-staff/update-staff.component';
import { UpdateUserGmComponent} from './UserBack/update-user/update-user-gm.component';
import { PasswordResetInitComponent} from './password-reset/init/password-reset-init.component';
import { PasswordResetFinishComponent} from './password-reset/finish/password-reset-finish.component';
import { EditManagerComponent } from './Branch/edit-manager/edit-manager.component';
import { EditApprovalLimitComponent } from './Branch/edit-approval-limit/edit-approval-limit.component';
import { EditCompanyAdminComponent } from './Branch/edit-company-admin/edit-company-admin.component';
import { Oauth2Component } from './Account/tradeshift/oauth2.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { CostCenterEditComponent } from './cost-center/cost-center-edit/cost-center-edit.component';
import { CostCenterEditGmComponent } from './cost-center/cost-center-edit-gm/cost-center-edit-gm.component';

// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
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
    ListErrorCcComponent,
    LoginComponent,
    SignupComponent,
    LayoutComponent,
    ConfirmationDialogComponent,
    UpdateStaffComponent,
    UpdateUserGmComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    EditManagerComponent,
    EditApprovalLimitComponent,
    EditCompanyAdminComponent,
    Oauth2Component,
    CostCenterComponent,
    CostCenterEditComponent,
    CostCenterEditGmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatRadioModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(translate: TranslateService) {
    translate.addLangs(['fr', 'en']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/fr|en/) ? browserLang : 'fr');
  }}
