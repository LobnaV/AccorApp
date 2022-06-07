import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { JsonToCsvComponent } from './Test/json-to-csv/json-to-csv.component';
import { UploadCsvToJsonComponent } from './Test/upload-csv-to-json/upload-csv-to-json.component';
import { ListComponent } from './User/list/list.component';

const routes: Routes = [
  {path: 'ListOfUsers', component:ListComponent},
  {path: 'Home', component:MainPageComponent},
  {path: 'XlsxtoJson', component:UploadCsvToJsonComponent},
  {path: 'JsonToCsv', component:JsonToCsvComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
