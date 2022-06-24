import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Company } from '../company';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  company: Company = new Company();

  companyForm = new FormGroup({
    hotel_MegaCode: new FormControl(''),
    hotel_Name: new FormControl(''),
    //users: new FormControl(''),
  })

  constructor(
    private service: AccorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const companyId = this.route.snapshot.params['companyId'];
    this.service.getCompanyId(companyId)
      .subscribe(
        (company: Company) => {
          this.companyForm.patchValue(company)
          console.log(company)
        }
      )
  }

  UpdateCompany() {
    const updateForm = this.companyForm.value;
    this.service.UpdateCompany(updateForm)
      .subscribe(
        (company: Company) => {
          console.log("update ok")
          this.router.navigate(['companies'])
        }
      )
  }

}
