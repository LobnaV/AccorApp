import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AccorService } from 'src/app/accor.service';
import { Branch } from 'src/app/model/branch';
import { User } from 'src/app/model/user';
import { Param } from 'src/app/model/param';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-edit-manager',
  templateUrl: './edit-manager.component.html',
  styleUrls: ['./edit-manager.component.scss']
})
export class EditManagerComponent implements OnInit {

  branch?: Branch;
  user?: User;
  companies?: Param[]|any = [];



  params:any;
  branche:any;
  parameters: any;

  managerForm = new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    category: new FormGroup({
      name: new FormControl(''),
      approvalLimitGM: new FormControl(''),
      approvalLimitN1: new FormControl(''),
      approvalLimitN2: new FormControl('')
    }),
    perimeter: new FormControl(''),

  })


  constructor(
    private service: AccorService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.loadCompanies(params['id']);
    });


    this.route.params.subscribe(params => {
      console.log(params['id']);
      this.service.branchId(params['id']).subscribe(data => {
        this.branche = data;
        console.log(data);
      });
    });

    this.route.params.subscribe(params => {

      const idBranch = params['id'];
      this.service.branchId(idBranch).subscribe(
        (res: HttpResponse<Branch>) => {
          this.branch = res.body!;
        },
        (res: HttpErrorResponse) => console.log(res.message)
      );


      if (idBranch) {
        this.service.branchId(idBranch).subscribe(
          (res: HttpResponse<Branch>) => {
            this.branch = res.body!;
            this.managerForm.patchValue({   
              id: this.branch?.id,
              code: this.branch?.code,
              name: this.branch?.name,
              category: {
                name: this.companies?.category?.name,
                approvalLimitGM: this.companies?.category?.approvalLimitGM,
                approvalLimitN1: this.companies?.category?.approvalLimitN1,
                approvalLimitN2: this.companies?.category?.approvalLimitN2
              },
              perimeter: this.branch?.perimeter,
            });

             let element : any;
             let el: any;

            for (let i = 0; i < this.companies?.length; i++) {
              element = this.companies[i];
              
              console.log(element.category.name)

              el = element.category.name
              el++
            }
            console.log(element++)            
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
      } else {
        this.branch = new Branch()
      }
    })

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

  Update() {
    const updateForm = {
      ...new Branch(),
      id: this.managerForm.get('id')?.value,
      code: this.managerForm.get('code')?.value,
      name: this.managerForm.get('name')?.value,
      category: this.managerForm.get('category')?.value,
      perimeter: this.managerForm.get('perimeter')?.value,
    };
    console.log(updateForm);

    if (this.branch?.id) {
      this.service.updateBranch(updateForm)
        .subscribe(
          (res: HttpResponse<Branch>) => {
            console.log('update ok')
            this.location.back()
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    } else {
      this.service.addBranch(updateForm)
        .subscribe(
          (res: HttpResponse<Branch>) => {
            this.location.back();
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
    }
  }

}
