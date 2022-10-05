import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Param } from '../../model/param';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { Branch } from 'src/app/model/branch';

@Component({
  selector: 'app-edit-param',
  templateUrl: './edit-param.component.html',
  styleUrls: ['./edit-param.component.scss']
})
export class EditParamComponent implements OnInit {

  param? :Param ;
  branch?: Branch;

  editCompanyParamForm = new FormGroup({
    megaCode: new FormControl(''),
    name: new FormControl(''),
    userGM: new FormControl(''),
    // portfolio: new FormControl(''),
    // mm_gm: new FormControl(''),
    // mmm_gm: new FormControl(''),

  })
  constructor(
    private service: AccorService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    

    this.route.params.subscribe(params => {
      const idBranch = params['id'];
      this.service.branchId(idBranch).subscribe(
        (res: HttpResponse<Branch>) => {
          this.branch = res.body!;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      )
    })

    const paramId = this.route.snapshot.params['paramId'];
    this.service.ParamId(paramId).subscribe(
      (res: HttpResponse<Param>) => {
        this.param = res.body!;
        console.log(res.body);
        this.editCompanyParamForm.patchValue({
          megaCode: this.param?.megaCode,
          name: this.param?.name,
          userGM: this.param.userGM?.username

        });
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  UpdateParam(){
    const updateForm = this.editCompanyParamForm.value;
    this.service.updateParam(updateForm)
    .subscribe(
      (res: HttpResponse<Param>) =>{
          console.log('update ok')
          this.router.navigate(["Parameter"])
        }
      )
  }

}
