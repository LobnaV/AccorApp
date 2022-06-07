import { Component, OnInit } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { AccorService } from 'src/app/accor.service';

@Component({
  selector: 'app-json-to-csv',
  templateUrl: './json-to-csv.component.html',
  styleUrls: ['./json-to-csv.component.scss']
})
export class JsonToCsvComponent implements OnInit {
  jsonData:any[] = [];
 
  searchKey: string = "";
  searchTerm: string = "";
  constructor(
    private appService:AccorService,
  ) { }

  ngOnInit(): void {
    this.appService.getDonneeJson()
    .subscribe(data => (this.jsonData = data))
    
    this.appService.search.subscribe((val:any) =>{
      this.searchKey = val;
    })
  }
  Search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.appService.search.next(this.searchTerm);
 }

  fileDownload(){

    let options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers:['BRANCH_ID', 'HOME', 'EMAIL', 'FIRST_NAME', 'LAST_NAME', 'STATE', 'MANAGER', 'APPROVAL_LIMIT', 'USER_TYPE']
    };

    new ngxCsv (this.jsonData, "DataInCsv",options )
  }
}
