import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftCompanyMasterService } from '@shared/_http/gift-company-master.service';
import { GiftCompanyMasterDetailsData, GiftCompanyMasterFormStructure } from '@shared/configs/company-gift-master-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-gift-company-master',
  templateUrl: './modify-gift-company-master.component.html',
  styleUrl: './modify-gift-company-master.component.scss'
})
export class ModifyGiftCompanyMasterComponent implements OnInit, AfterViewInit {
  subs: Subscription = new Subscription();
  routeName: string = '';
  routeId: any;
  companyFormStructure!: IFormStructure[];
  companyMasterDetailsData: RowData = GiftCompanyMasterDetailsData;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private companyService: GiftCompanyMasterService
  ) { }

  ngOnInit(): void {
    this.companyFormStructure = JSON.parse(JSON.stringify(GiftCompanyMasterFormStructure));

    this.activatedRoute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });

    this.initializeForm();
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getCompany();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initializeForm(): void {
    this.companyFormStructure.forEach(ele => {
      if (this.routeName === 'view') {
        ele.disable = true;
      }
      if (ele.type === 'select') {
        this.setOptionValues(ele);
      }
    });
  }

  setOptionValues(ele: IFormStructure) {
    if (ele.listName === 'active_status') {
      ele.listData = [
        { status_id: 0, name: 'No' },
        { status_id: 1, name: 'Yes' }
      ];
    }
  }

  getCompany(): void {
    this.subs.add(
      this.companyService.getCompanyById(this.routeId).subscribe({
        next: (res) => {
          this.companyMasterDetailsData.data = res.data;
          if (res.data.company_logo_path) {
            this.companyMasterDetailsData.data.company_logo = res.data.company_logo_path;
          }
        }
      })
    );
  }

  handleFileUpload(event: any): void {
    console.log('event. = ', event);
    if (event?.fieldName === "company_logo") {
      this.companyMasterDetailsData.data.company_logo_file = event.base64String;
      this.companyMasterDetailsData.data.company_logo = event.imgName;
    }
  }

  handleSubmit(event: any): void {
    const formData = { ...event.formValue };

    if (this.companyMasterDetailsData?.data?.company_logo_file && this.companyMasterDetailsData?.data?.company_logo) {
      formData.company_logo_file = this.companyMasterDetailsData.data.company_logo_file;
      formData.company_logo = this.companyMasterDetailsData.data.company_logo;
    }
    switch (this.routeName) {
      case 'create':
        this.subs.add(
          this.companyService.createCompany(formData).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'Company created successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/gift-company-master');
            },
            error: (err) => {
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;
      case 'edit':
        this.subs.add(
          this.companyService.updateCompany(formData, this.routeId).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'Company updated successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/gift-company-master');
            },
            error: (err) => {
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;
    }
  }
}
