import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './Account/login/login.component';
import {SignupComponent} from './Account/signup/signup.component';
import {AddBranchComponent} from './Branch/add-branch/add-branch.component';
import {ListErrorCcComponent} from './cost-center/list-error-cc/list-error-cc.component';
import {AccorGuard} from './Guard/accor.guard';
import {LayoutComponent} from './layout/layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {EditParamComponent} from './Parameter/edit-param/edit-param.component';
import {ParameterComponent} from './Parameter/parameter/parameter.component';
import {UserListComponent} from './UserBack/user-list/user-list.component';
import {UpdateStaffComponent} from "./UserBack/update-staff/update-staff.component";
import {UpdateUserGmComponent} from "./UserBack/update-user/update-user-gm.component";
import {passwordResetFinishRoute} from "./password-reset/finish/password-reset-finish.route";
import {passwordResetInitRoute} from "./password-reset/init/password-reset-init.route";
import { EditManagerComponent } from './Branch/edit-manager/edit-manager.component';
import { EditApprovalLimitComponent } from './Branch/edit-approval-limit/edit-approval-limit.component';
import { EditCompanyAdminComponent } from './Branch/edit-company-admin/edit-company-admin.component';
import {Oauth2Component} from "./Account/tradeshift/oauth2.component";
import { CostCenterEditComponent } from './cost-center/cost-center-edit/cost-center-edit.component';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { CostCenterEditGmComponent } from './cost-center/cost-center-edit-gm/cost-center-edit-gm.component';

const ACCOUNT_ROUTES = [
  passwordResetFinishRoute,
  passwordResetInitRoute
];

const routes: Routes = [
  // {path: '', component: Oauth2Component},
  {path: '', component: LoginComponent},
  {path: 'auth/callback', component: Oauth2Component},
  {path: '', children: ACCOUNT_ROUTES},
  {path: 'login', component: LoginComponent},
  {
    path: '', canActivate: [AccorGuard], component: LayoutComponent, children: [
      {path: 'Home', component: MainPageComponent},
      {path: 'signup', component: SignupComponent},


      {path: 'compagny-param/:id', component: UserListComponent},
      {path: 'compagny-param/:id/staff/add', component: UpdateStaffComponent},
      {path: 'compagny-param/:id/staff/:staffId/edit', component: UpdateStaffComponent},
      {path: 'compagny-param/:id/user-gm/:userId/edit', component: UpdateUserGmComponent},

      {path: 'compagny-param/:id/costCenter/:costCenterId/edit', component: CostCenterEditGmComponent},
      {path: 'compagny-param/:id/listErrorCostCenter', component: ListErrorCcComponent},


      {path: 'branch/:id', component: ParameterComponent},
      {path: 'branch/:id/compagny-param/add', component:EditParamComponent},
      {path: 'branch/:id/compagny-param/:paramId/edit', component: EditParamComponent},

      {path: 'branch/:branchId/NE/compagny-param/:paramId', component: CostCenterComponent},
      {path: 'branch/:branchId/NE/compagny-param/:paramId/cost-center/add', component:CostCenterEditComponent},
      {path: 'branch/:branchId/NE/compagny-param/:paramId/cost-center/:costCenterId/edit', component: CostCenterEditComponent},


      {path: 'Home/branch/:id/edit-manager', component:EditManagerComponent},
      {path: 'Home/branch/:id/edit-approval_limit', component:EditApprovalLimitComponent},
      {path: 'Home/branch/:id/access', component:EditCompanyAdminComponent},

      {path: 'UserList/:id', component: UserListComponent},
      {path: 'create/branch', component: AddBranchComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
