import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Param} from '../../model/param';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Branch } from 'src/app/model/branch';
import { ConfirmationDialogService } from 'src/app/UserBack/confirmation-dialog/confirmation-dialog.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-parameter',
  templateUrl: './parameter.component.html'
})
export class ParameterComponent implements OnInit {

  searchKey: string = "";
  searchTerm: string = "";
  message1?:any;
  message1part2?:any;
  message2?:any;

lang:any
  constructor(
    private service:AccorService,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    private confirmationDialogService: ConfirmationDialogService,
    private location: Location

  ) {

    this.message1 = this.translate.instant('DELETE.MESSAGE1');
    this.message1part2 = this.translate.instant('DELETE.MESSAGE1PART2');
    this.message2 = this.translate.instant('DELETE.MESSAGE2');
  }

  branch?: Branch;
  companies: Param[] = [];

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const branchId = params['id'];
      this.loadBranch(branchId);
      this.loadCompanies(branchId);
    });

    this.service.search.subscribe((val: any) => {
      this.searchKey = val;
    })

  }

  loadBranch(idBranch: number) {
    this.service.branchId(idBranch).subscribe(
      (res: HttpResponse<Branch>) => this.branch = res.body!,
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  back(){
    this.location.back()
  }

  loadCompanies(idBranch: number) {
    this.service.companieBranch(idBranch).subscribe(
      (res: HttpResponse<Param[]>) => {
        this.companies = res.body!;
      },
      (res: HttpErrorResponse) => console.log(res.message)
    );
  }

  Search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.service.search.next(this.searchTerm);
  }

  remove(paramId:any){
    this.service.deleteParam(paramId).subscribe( () => this.loadCompanies(this.branch?.id!));
  }

  deleteParam(idParam: number, name: string) {
    this.confirmationDialogService.confirm('Confirmation', this.message1 + name + this.message1part2 )
         .then((confirmed) => {
          if (confirmed) {
            this.confirmationDialogService.confirm('Confirmation', this.message2)
              .then((deleteConfirm) => {
                if (deleteConfirm) {
                  this.remove(idParam);
                }
              })
              .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
          }
        }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }


 }





