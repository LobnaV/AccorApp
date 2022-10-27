import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccorService } from 'src/app/accor.service';
import { Branch } from '../../model/branch';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  branch?: Branch;
  selectedPerimeter?: any;
  perimeters?:any = ['SE','NE'];

  branchForm =  new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    perimeter: new FormControl(''),
    uuid: new FormControl('')
  })

  constructor(
    private service: AccorService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {

      // const idBranch = params['id'];
      // this.service.branchId(idBranch).subscribe(
      //   (res: HttpResponse<Branch>) => {
      //     this.branch = res.body!;
      //   },
      //   (res: HttpErrorResponse) => console.log(res.message)
      // );

      const branchId = params['branchId'];
      if(branchId){
        this.service.ParamId(branchId).subscribe(
          (res: HttpResponse<Branch>) => {
            this.branch = res.body!;
            this.branchForm.patchValue({
              id: this.branch?.id,
              code: this.branch?.code,
              name: this.branch?.name,
              perimeter: this.selectedPerimeter,
              uuid: this.branch?.uuid,
            });
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
      } else {
        this.branch = new Branch();
      }
    })
  }

  Update(){

    const updateForm = this.branchForm.value;

    this.service.addBranch(updateForm)
    .subscribe(
      (res:HttpResponse<Branch>) => {
        console.log('create branch OK')
        this.location.back();
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  
}
