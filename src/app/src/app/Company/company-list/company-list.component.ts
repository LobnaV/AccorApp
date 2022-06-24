import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Company } from '../company';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: any;
  hotels: any;
  searchKey: string = "";
  searchTerm: string = "";

  // companyForm = new FormGroup({
  //   hotel_MegaCode: new FormControl(''),
  //   perimeter: new FormControl(''),
  //   general_manager: new FormControl('', [Validators.email]),
  //   portfolio: new FormControl('', [Validators.email]),
  //   mm_gm: new FormControl('', [Validators.email]),
  //   mmm_gm: new FormControl('', [Validators.email]),
  //   // branch: new FormControl('')
  // })

  constructor(
    private service: AccorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.getCompanies()
      .subscribe(data => {
        this.companies = data;
        console.log(this.companies)
      })

    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }

  NewCompany() {
    this.router.navigate(["addCompany"]);
  }

  remove(companyId:Company) {
    this.service.deleteCompany(companyId)
     .subscribe(
        (data: any) => {
          this.hotels = this.hotels?.filter((hotel: { id: any }) => companyId !== hotel.id);
          alert("delete company");
          this.router.navigate(["companies"])
        }
     )

  }


}
