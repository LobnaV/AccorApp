import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { command } from 'execa';
import { AddBranchComponent } from './Branch/add-branch/add-branch.component';
import { ListBranchComponent } from './Branch/list-branch/list-branch.component';
import { AddCompanyComponent } from './Company/add-company/add-company.component';
import { CompanyListComponent } from './Company/company-list/company-list.component';
import { EditCompanyComponent } from './Company/edit-company/edit-company.component';
import { AddCostCenterComponent } from './CostCenter/add-cost-center/add-cost-center.component';
import { EditCCComponent } from './CostCenter/edit-cc/edit-cc.component';
import { ListCcComponent } from './CostCenter/list-cc/list-cc.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddParamComponent } from './Parameter/add-param/add-param.component';
import { EditParamComponent } from './Parameter/edit-param/edit-param.component';
import { ParameterComponent } from './Parameter/parameter/parameter.component';
import { JsonToCsvComponent } from './Test/json-to-csv/json-to-csv.component';
import { UploadCsvToJsonComponent } from './Test/upload-csv-to-json/upload-csv-to-json.component';
import { ListComponent } from './User/list/list.component';
import { AddUserComponent } from './UserBack/add-user/add-user.component';
import { EditUserComponent } from './UserBack/edit-user/edit-user.component';
import { UserListComponent } from './UserBack/user-list/user-list.component';

const routes: Routes = [
  {path: 'ListOfUsers', component:ListComponent},
  {path: 'ListOfHotels', component:CompanyListComponent},

  {path: 'UserList', component:UserListComponent},
  {path: 'Parameter', component:ParameterComponent},
  {path: 'AddParam', component:AddParamComponent},
  {path: 'editParameter/:paramId', component:EditParamComponent},
  {path: 'addUser', component:AddUserComponent},
  {path: 'edit/:userId', component:EditUserComponent},
  {path: 'Home', component:MainPageComponent},
  {path: 'companies', component:CompanyListComponent},
  {path: 'editCompany/:companyId', component:EditCompanyComponent},
  {path: 'addCompany', component:AddCompanyComponent},
  {path: 'branchs', component:ListBranchComponent},
  {path: 'addBranch', component:AddBranchComponent},
  {path: 'listCostCenter', component:ListCcComponent},
  {path: 'addCostCenter', component:AddCostCenterComponent},
  {path: 'editCC/:CostCenterId ', component:EditCCComponent},
  {path: 'XlsxtoJson', component:UploadCsvToJsonComponent},
  {path: 'JsonToCsv', component:JsonToCsvComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
