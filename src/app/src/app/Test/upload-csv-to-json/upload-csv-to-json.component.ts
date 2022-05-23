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

  jsonData: any = [];

  constructor(
    private appService:AccorService,
    private http:HttpClient) { }

  ngOnInit(): void {
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

        let inventoryData = JsonPipe.toString()
      })
      console.log(workbook)
    }
  }

//   jsonData=[{
//     "BRANCH_ID": "A9024903",
//     "HOME": "TRUE",
//     "EMAIL": "H3162-AM@ACCOR.COM",
//     "FIRST_NAME": "Glen",
//     "LAST_NAME": "Anderson",
//     "STATE": "LOCKED",
//     "MANAGER": "H3162-GM@ACCOR.COM",
//     "USER_TYPE": "Head of Department"
//   },
//   {
//     "BRANCH_ID": "B9024903",
//   }
// ]

  // download(){
  //   //let jsonData = this.http.get<any>('../assets/TestAccor.json');
  //     this.appService.downloadFile(this.jsonData, 'TestAccor');
  //     console.log('JsonDaata'+ this.jsonData)
  // }

  fileDownload(){
    this.jsonData = this.http.get<any>('../assets/TestAccor.json');

    let options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers:['BRANCH_ID', 'HOME', 'EMAIL', 'FIRST_NAME', 'LAST_NAME', 'STATE', 'MANAGER', 'APPROVAL_LIMIT', 'USER_TYPE']
    };

    new ngxCsv (this.jsonData, "DataInCsv",options )
  }

}
