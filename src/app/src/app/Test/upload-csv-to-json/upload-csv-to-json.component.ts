import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { JsonPipe } from '@angular/common';
import { AccorService } from 'src/app/accor.service';
import { HttpClient } from '@angular/common/http';
import { ngxCsv } from 'ngx-csv/ngx-csv'

@Component({
  selector: 'app-upload-csv-to-json',
  templateUrl: './upload-csv-to-json.component.html',
  styleUrls: ['./upload-csv-to-json.component.scss']
})
export class UploadCsvToJsonComponent implements OnInit {

  jsonData:any[] = [];
 
  searchKey: string = "";
  searchTerm: string = "";

  constructor(
    private appService:AccorService,
    private http:HttpClient) { }

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

  convertedJson!: string;

  fileUpload(event: any) {
    console.log('test')
    console.log(event.target.files)
    const selectedFile = event.target.files[0];
    console.log(selectedFile.name)
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      console.log(event);
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, {
        type: 'binary'
      });
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log(data)
        this.convertedJson = JSON.stringify(data, undefined, 4)
        console.log(selectedFile.name + this.convertedJson)
        //Download file =>convertedJson
        // const saveData = new Blob([JSON.stringify(this.convertedJson)], {type : 'application/json'});
        //   saveAs(saveData, 'abc.json');
        //   console.log('save' + saveData)
      })
      console.log(workbook)
    }
  }

}
