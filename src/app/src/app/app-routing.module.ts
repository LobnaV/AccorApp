import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './Account/login/login.component';
import {SignupComponent} from './Account/signup/signup.component';
import {AddBranchComponent} from './Branch/add-branch/add-branch.component';
import {ListBranchComponent} from './Branch/list-branch/list-branch.component';
import {AddCostCenterComponent} from './CostCenter/add-cost-center/add-cost-center.component';
import {EditCCComponent} from './CostCenter/edit-cc/edit-cc.component';
import {ListCcComponent} from './CostCenter/list-cc/list-cc.component';
import {AccorGuard} from './Guard/accor.guard';
import {LayoutComponent} from './layout/layout.component';
import {MainPageComponent} from './main-page/main-page.component';
import {AddParamComponent} from './Parameter/add-param/add-param.component';
import {EditParamComponent} from './Parameter/edit-param/edit-param.component';
import {ParameterComponent} from './Parameter/parameter/parameter.component';
import {UserListComponent} from './UserBack/user-list/user-list.component';
import {UpdateStaffComponent} from "./UserBack/update-staff/update-staff.component";
import {UpdateUserGmComponent} from "./UserBack/update-user/update-user-gm.component";
import {passwordResetFinishRoute} from "./password-reset/finish/password-reset-finish.route";
import {passwordResetInitRoute} from "./password-reset/init/password-reset-init.route";

const ACCOUNT_ROUTES = [
  passwordResetFinishRoute,
  passwordResetInitRoute
];

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
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

      {path: 'branch/:id', component: ParameterComponent},
      {path: 'branch/:id/compagny-param/:paramId/edit', component: EditParamComponent},

      {path: 'UserList/:id', component: UserListComponent},
      {path: 'x/:dispId', component: UserListComponent},
      {path: 'AddParam', component: AddParamComponent},
      {path: 'branchs/:id', component: ListBranchComponent},
      {path: 'addBranch', component: AddBranchComponent},
      {path: 'listCostCenter', component: ListCcComponent},
      {path: 'addCostCenter', component: AddCostCenterComponent},
      {path: 'editCC/:CostCenterId ', component: EditCCComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
