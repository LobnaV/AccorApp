import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import {Param} from "../../model/param";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { TranslateService } from '@ngx-translate/core';
import { Branch } from 'src/app/model/branch';
import { User } from 'src/app/model/user';

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
  branche?:any;

  constructor(
    private service:AccorService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService

  ) { }

  companyParamForm = new FormGroup({
    hotel_MegaCode: new FormControl(''),
    hotel_Name: new FormControl(''),
    branchID: new FormControl(''),
    perimeter: new FormControl(''),
    general_manager: new FormControl('',[Validators.required,Validators.email]),
    email_m_gm: new FormControl('',[Validators.required,Validators.email]),
    portfolio: new FormControl('',[Validators.email]),
    mm_gm: new FormControl('',[Validators.email]),
    mmm_gm: new FormControl('',[Validators.email]),
    // branch: new FormControl('')

  })

  branch? : Branch|null
  companies?: Param[]|any = [];
  userMGM?: User | null;

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.loadMGM(params['id']);
      this.loadCompanies(params['id']);
    });

    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.service.branchId(params['id']).subscribe(data => {
        this.branche = data;
        console.log(data);
      });
    });

    this.service.getParams().subscribe(
      (res: HttpResponse<Param[]>) => {
        this.parameters = res.body;
        console.log(this.parameters)
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );

  this.service.search.subscribe((val: any) => {
    this.searchKey = val;
  })

  }

  loadMGM(idBranch: number) {
    this.service.branchId(idBranch).subscribe(
      (res: HttpResponse<Branch>) => {
        this.branch = res.body;
        this.userMGM = this.branch?.userMGM;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }


  loadCompanies(idBranch: number) {
    this.service.companieBranch(idBranch).subscribe(
      (res: HttpResponse<Param[]>) => {
        this.companies = res.body;
        console.log(this.companies)
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }

   //Switch language
   translateLanguageTo(lang: string) {
    this.translate.use(lang);
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





