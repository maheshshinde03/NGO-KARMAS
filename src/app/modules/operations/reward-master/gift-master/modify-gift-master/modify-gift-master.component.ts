import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GiftCompanyMasterService } from '@shared/_http/gift-company-master.service';
import { GiftMasterService } from '@shared/_http/gift-master.service';
import { GiftMasterDetailsData, GiftMasterFormStructure } from '@shared/configs/gift-master-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-gift-master',
  templateUrl: './modify-gift-master.component.html',
  styleUrl: './modify-gift-master.component.scss'
})
export class ModifyGiftMasterComponent implements OnInit, AfterViewInit {
  subs: Subscription = new Subscription(); // Manage subscriptions
  routeName: string = ''; // create, edit, view
  routeId: any; // id if edit or view
  giftFormStructure!: IFormStructure[]; // Form fields structure
  giftMasterDetailsData: RowData = GiftMasterDetailsData; // Table config for view binding

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private giftService: GiftMasterService,
    private companyService: GiftCompanyMasterService,
    public loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.giftFormStructure = JSON.parse(JSON.stringify(GiftMasterFormStructure));

    // Get action from route (create/edit/view)
    this.activatedRoute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });

    // Get ID if edit/view
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });

    this.initializeForm();
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getGift();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Initialize form: disable if view, load dropdowns
   */
  initializeForm(): void {
    this.giftFormStructure.forEach(ele => {
      if (this.routeName === 'view') {
        ele.disable = true;
      }
      if (ele.type === 'select') {
        this.setOptionValues(ele);
      }
    });
  }

  /**
   * Set dropdown data for status/company
   * @param ele form element
   */
  setOptionValues(ele: IFormStructure) {
    if (ele.listName === 'active_status') {
      ele.listData = [
        { status_id: 0, name: 'No' },
        { status_id: 1, name: 'Yes' }
      ];
    }
    if (ele.listName === 'company_list') {
      this.subs.add(
        this.companyService.getAllCompanies().subscribe({
          next: (value) => {
            ele.listData = value.data;
          }
        })
      );
      // Replace below with dynamic company fetch if needed
      // ele.listData = [
      //   { company_id: 1, company_name: 'Company A' },
      //   { company_id: 2, company_name: 'Company B' }
      // ];
    }
  }

  /**
   * Fetch gift details if edit/view
   */
  getGift(): void {
    this.loader.showLoader();
    this.subs.add(
      this.giftService.getGiftById(this.routeId).subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.giftMasterDetailsData.data = res.data;
        }, error: () => {
          this.loader.hideLoader();

        }
      })
    );
  }

  /**
   * Handle form submission for create/edit
   * @param event form emitted data
   */
  handleSubmit(event: any): void {
    const formData = { ...event.formValue };

    switch (this.routeName) {
      case 'create':
        this.subs.add(
          this.giftService.createGift(formData).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'Gift created successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/gift-master');
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
          this.giftService.updateGift(formData, this.routeId).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'Gift updated successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/gift-master');
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