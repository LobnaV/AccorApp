import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccorService } from 'src/app/accor.service';
import {Param} from "../../model/param";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
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
  branche?:any;

  constructor(
    private service:AccorService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    private confirmationDialogService: ConfirmationDialogService,

  ) { }

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

  remove(paramId:any){
    this.service.deleteParam(paramId)
     .subscribe( (data:any) =>{
       this.params = this.params?.filter((param: { id: any; }) => paramId !== param.id);
         alert("deleted param");
         this.router.navigate(["Parameter"]);
     })
  }

  deleteParam(idParam: number, name: string) {
    this.confirmationDialogService.confirm('Confirmation', 'Deleting a hotel here means you will delete the hotel from the Company admin Dashboard, but does not mean that users will be deleted from Tradeshift production environment. If you need to delete a particular user in Tradeshift, as a company admin: If the user is a hotel member, you can ask the general manager to do it directly from his ' + name + ' session. This will delete the user from Tradeshift You can also delete the user directly from the Tradeshift app, please contact : astore.einvoicing.support@accor.com')
      .then((confirmed) => {
          if (confirmed) {
            this.confirmationDialogService.confirm('Confirmation', 'Yes I will delete users that need to be deleted, directly on Tradeshift, and I wish to delete this hotel from the dashboard.')
              .then(() => {
                if (confirmed) {
                 // this.remove(idParam);
                 console.log('remove ok')      
                }
              })
              .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
          }
        }
      )
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

  }


 }





