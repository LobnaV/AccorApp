import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { CostCenter } from '../cost-center';

@Component({
  selector: 'app-list-cc',
  templateUrl: './list-cc.component.html',
  styleUrls: ['./list-cc.component.scss']
})
export class ListCcComponent implements OnInit {

  costCenters:any;
  costcenter:any;
  searchKey: string = "";
  searchTerm: string = "";

  constructor(
    private service: AccorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.costCenterList()
      .subscribe(data =>{
        this.costCenters = data;
        console.log(this.costCenters)
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

  NewCostCenter() {
    this.router.navigate(["addCostCenter"]);
  }

  remove(ccId:CostCenter){
    this.service.deleteCC(ccId)
     .subscribe( (data:any) =>{
       this.costCenters = this.costCenters?.filter((costCenter: { id: any; }) => ccId !== costCenter.id);
         alert("deleted CC");
         this.router.navigate(["listCostCenter"]);
     })
  }

}

