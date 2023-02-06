import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import { Param} from '../../model/param';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Branch } from 'src/app/model/branch';
import { User } from 'src/app/model/user';
import { ConfirmationDialogService } from 'src/app/UserBack/confirmation-dialog/confirmation-dialog.service';

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
  branche?: Branch;
  message1?:any;
  message1part2?:any;
  message2?:any;

lang:any
  constructor(
    private service:AccorService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    private confirmationDialogService: ConfirmationDialogService

  ) {

    this.message1 = this.translate.instant('DELETE.MESSAGE1');
    this.message1part2 = this.translate.instant('DELETE.MESSAGE1PART2');
    this.message2 = this.translate.instant('DELETE.MESSAGE2');
  }

  branch? : Branch|null
  companies?: Param[] | any = [];
  userMGM?: User | null;

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.loadMGM(params['id']);
      this.loadCompanies(params['id']);
    });

    this.activatedRoute.params.subscribe(params => {
      console.log(params['id']);
      this.service.branchId(params['id']).subscribe((data: HttpResponse<Branch>) => {
        this.branche = data.body!;
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

  remove(paramId:any){
    this.service.deleteParam(paramId)
     .subscribe( () =>{
       this.loadCompanies(this.branche?.id!);
     })
  }

  deleteParam(idParam: number, name: string) {
    this.confirmationDialogService.confirm('Confirmation', this.message1 + name + this.message1part2 )
         .then((confirmed) => {
          if (confirmed) {
            this.confirmationDialogService.confirm('Confirmation', this.message2)
              .then(() => {
                if (confirmed) {
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





