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
  perimeters?:any = ['Southern Europe','Northern Europe'];

  branchForm =  new FormGroup({
    id: new FormControl(''),
    code: new FormControl(''),
    name: new FormControl(''),
    userMGM: new FormGroup({
      id: new FormControl(''),
      username: new FormControl(''),
      // roles: new FormControl (''),
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

      const idBranch = params['branchId'];
      if (idBranch) {
        this.service.branchId(idBranch).subscribe(
          (res: HttpResponse<Branch>) => {
            this.branch = res.body!;
            this.branchForm.patchValue({
              id: this.branch?.id,
              code: this.branch?.code,
              name: this.branch?.name,
              userMGM: {
                id: this.branch?.userMGM?.id,
                username: this.branch?.userMGM?.username,
                firstName: this.branch?.userMGM?.firstName,
                lastName: this.branch?.userMGM?.lastName,
                // roles: this.branch?.userMGM?.roles
              },
              perimeter: this.branch?.perimeter,
            });
          },
          (res: HttpErrorResponse) => console.log(res.message)
        );
      } else {
        this.branch = new Branch()
      }
    })
  }

  Update(){

    const updateForm = {
      ...new Branch(),
      id: this.branchForm.get('id')?.value,
      code: this.branchForm.get('code')?.value,
      name: this.branchForm.get('name')?.value,
      userMGM: this.branchForm.get('userMGM')?.value,
      perimeter: this.branchForm.get('perimeter')?.value,
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
