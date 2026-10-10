import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponsService } from '@shared/_http/coupons.service';
import { GiftMasterService } from '@shared/_http/gift-master.service';
import { CouponsDetailsData, CouponsFormStructure } from '@shared/configs/coupons-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-coupon-master',
  templateUrl: './modify-coupon-master.component.html',
  styleUrl: './modify-coupon-master.component.scss'
})
export class ModifyCouponMasterComponent  implements OnInit, AfterViewInit {
  subs: Subscription = new Subscription();
  routeName: string = ''; // create, edit, view
  routeId: any;
  couponsFormStructure!: IFormStructure[];
  couponsDetailsData: RowData = CouponsDetailsData;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private couponsService: CouponsService,
    private giftService: GiftMasterService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.couponsFormStructure = JSON.parse(JSON.stringify(CouponsFormStructure));

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
      this.getCoupon();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Initialize form: disable fields if in view mode and prepare select options
   */
  initializeForm(): void {
    this.couponsFormStructure.forEach(ele => {
      if (this.routeName === 'view') {
        ele.disable = true;
      }
      if (ele.type === 'select') {
        this.setOptionValues(ele);
      }
    });
  }

  /**
   * Set select dropdown values dynamically
   * @param ele form element
   */
  setOptionValues(ele: IFormStructure): void {
    if (ele.listName === 'gift_list') {
      this.subs.add(
        this.giftService.getAllGifts().subscribe({
          next: (res) => {
            ele.listData = res.data;
          }
        })
      );
    }
  }

  /**
   * Fetch coupon data if editing or viewing
   */
  getCoupon(): void {
    this.subs.add(
      this.couponsService.getCouponById(this.routeId).subscribe({
        next: (res) => {
          this.couponsDetailsData.data = res.data;
        }
      })
    );
  }

  /**
   * Handle form submission for create or edit actions
   * @param event form data
   */
  handleSubmit(event: any): void {
    const formData = { ...event.formValue };

    switch (this.routeName) {
      case 'create':
        this.subs.add(
          this.couponsService.createCoupon(formData).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'Coupon created successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/coupon-master');
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
          this.couponsService.updateCoupon(formData, this.routeId).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'Coupon updated successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/coupon-master');
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