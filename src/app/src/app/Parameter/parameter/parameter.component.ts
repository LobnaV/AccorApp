import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html',
  styleUrls: ['./parameter.component.scss']
})
export class ParameterComponent implements OnInit {
  params:any;
  parameters: any;
  searchKey: string = "";
  searchTerm: string = "";


  constructor(
    private service:AccorService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.service.getParams()
    .subscribe(data => {
      this.parameters = data;
      console.log(this.parameters)
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

  NewParam(){
    this.router.navigate(["AddParam"]);
  }

  remove(paramId:any){
    this.service.deleteParam(paramId)
     .subscribe( (data:any) =>{
       this.params = this.params?.filter((param: { id: any; }) => paramId !== param.id);
         alert("deleted param");
         this.router.navigate(["Parameter"]);
     })
  }
 
  
 }





