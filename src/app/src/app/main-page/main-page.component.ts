import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  private userInfo = `${environment.BaseUrl}/tradeshift/rest/external/account/info/user`
  private listAccount = `${environment.BaseUrl}/tradeshift/rest/external/account`;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAccount();
  }

  getUserInfo(){
    this.http.get<any>(this.userInfo)
      .subscribe(response => {
        this.userInfo = response;
      })
      console.log('test get user info' + this.userInfo)
  }

  getAccount(){
    this.http.get<any>(this.listAccount)
      .subscribe(response => {
        this.listAccount = response;
    })
    console.log('test account ' + this.listAccount)
  }
}
