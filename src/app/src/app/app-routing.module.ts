import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { command } from 'execa';
import { LoginComponent } from './Account/login/login.component';
import { SignupComponent } from './Account/signup/signup.component';
import { AddBranchComponent } from './Branch/add-branch/add-branch.component';
import { ListBranchComponent } from './Branch/list-branch/list-branch.component';
import { AddCompanyComponent } from './Company/add-company/add-company.component';
import { CompanyListComponent } from './Company/company-list/company-list.component';
import { EditCompanyComponent } from './Company/edit-company/edit-company.component';
import { AddCostCenterComponent } from './CostCenter/add-cost-center/add-cost-center.component';
import { EditCCComponent } from './CostCenter/edit-cc/edit-cc.component';
import { ListCcComponent } from './CostCenter/list-cc/list-cc.component';
import { AccorGuard } from './Guard/accor.guard';
import { LayoutComponent } from './layout/layout.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddParamComponent } from './Parameter/add-param/add-param.component';
import { EditParamComponent } from './Parameter/edit-param/edit-param.component';
import { ParameterComponent } from './Parameter/parameter/parameter.component';
import { AddUserComponent } from './UserBack/add-user/add-user.component';
import { EditUserComponent } from './UserBack/edit-user/edit-user.component';
import { UserListComponent } from './UserBack/user-list/user-list.component';

const routes: Routes = [
  { path:'',redirectTo:'/login', pathMatch:'full'},
  { path:'login',component:LoginComponent},
  { path:'', canActivate:[AccorGuard], component:LayoutComponent, children:[
    {path: 'Home', component:MainPageComponent},
    { path:'signup',component:SignupComponent},

  //{path: 'ListOfUsers', component:UserListComponent},
  {path: 'ListOfHotels', component:CompanyListComponent},

  {path: 'UserList', component:UserListComponent},
  {path: 'x/:dispId', component:UserListComponent},
  {path: 'Parameter', component:ParameterComponent},
  {path: 'AddParam', component:AddParamComponent},
  {path: 'editParameter/:paramId', component:EditParamComponent},
  {path: 'addUser', component:AddUserComponent},
  {path: 'edit/:userId', component:EditUserComponent},
  {path: 'companies', component:CompanyListComponent},
  {path: 'editCompany/:companyId', component:EditCompanyComponent},
  {path: 'addCompany', component:AddCompanyComponent},
  {path: 'branchs', component:ListBranchComponent},
  {path: 'addBranch', component:AddBranchComponent},
  {path: 'listCostCenter', component:ListCcComponent},
  {path: 'addCostCenter', component:AddCostCenterComponent},
  {path: 'editCC/:CostCenterId ', component:EditCCComponent}
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
