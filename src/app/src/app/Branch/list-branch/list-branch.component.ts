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
  
  branchs:any = [];
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
    this.service.branches()
      .subscribe(data =>{
        this.branchs = data;
        console.log(this.branchs  )
        console.log('Ligne 32  ' + JSON.stringify(this.branchs))
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
