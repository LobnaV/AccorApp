import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.scss']
})
export class ListBranchComponent implements OnInit {
  branchs:any;
  branch:any;
  searchKey: string = "";
  searchTerm: string = "";

  branchForm = new FormGroup({
    branch_Id:new FormControl(''), 
    branch_Name:new FormControl(''),
    country_Code:new  FormControl(''),
    perimeter:new FormControl(''),
    companies:new FormControl('', Array),
  })
  constructor(
    private service: AccorService,
    private router: Router) { }

  ngOnInit(): void {
    this.service.branchs()
      .subscribe(data =>{
        this.branchs = data;
        console.log(this.branchs)

        for (let i = 0; i < this.branchs.length; i++) {
          const companiesBranch = this.branchs[i].companies;
          console.log('test  ' + companiesBranch)

          // for (let ic = 0; ic < this.companiesBranch.length; ic++) {
          //   const element = array[ic];
            
          // }
          

          
        }
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

   NewBranch(){
    this.router.navigate(['addBranch']);
  }

}
