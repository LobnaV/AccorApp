import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccorService } from '../accor.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']

})
export class MainPageComponent implements OnInit {

  private userInfo = `${environment.BaseUrl}/tradeshift/rest/external/account/info/user`
  private listAccount = `${environment.BaseUrl}/tradeshift/rest/external/account`;
  companies: any = [];
 

  constructor(
    private http: HttpClient,
    private service: AccorService
    ) { }

  ngOnInit(): void {
    // this.getUserInfo();
    // this.getAccount();

    this.service.getCompanies()
    .subscribe(data => {
      this.companies = data;
      console.log('test1', this.companies)
      // this.companies.push(data)
      // console.log('test2', this.companies.push(data)
      // )
      
    })


  }

 ValueChange(event:any){
  console.log("selected value", event?.target.value,
  'value selected', this.companies)
 }

 save(){
  console.log('value i got', this.companies)
 }



//   getUserInfo(){
//     this.http.get<any>(this.userInfo)
//       .subscribe(response => {
//         this.userInfo = response;
//       })
//       console.log('test get user info' + this.userInfo)
//   }

//   getAccount(){
//     this.http.get<any>(this.listAccount)
//       .subscribe(response => {
//         this.listAccount = response;
//     })
//     console.log('test account ' + this.listAccount)
//   }

//  async testGet(){
// 	let response = fetch(`https://api-sandbox.tradeshift.com/tradeshift/rest/external/network/companies`);
//     //console.log(response.status);//200
//     //console.log(response.statusText);//OK

//     //consition nn obligatoire
//    // if(response.status === 200){
//         let data = (await response).text()//handle data
//         console.log('data' + data)
//   //  }
// } 
}
