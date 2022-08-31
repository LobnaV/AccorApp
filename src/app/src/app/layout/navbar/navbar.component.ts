import { Component, OnInit } from '@angular/core';
import { AccorService } from 'src/app/accor.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private service:AccorService
  ) { }

  ngOnInit(): void {
  }

  onClickLogout() {
    this.service.logout();
  }

}
