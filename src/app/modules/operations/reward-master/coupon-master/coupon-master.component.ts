import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CouponsService } from '@shared/_http/coupons.service';
import { CouponsDetailsData } from '@shared/configs/coupons-config';
import { RowData } from '@shared/models/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coupon-master',
  templateUrl: './coupon-master.component.html',
  styleUrl: './coupon-master.component.scss'
})
export class CouponMasterComponent {
couponsDetailsData: RowData = CouponsDetailsData; // Table configuration
subs: Subscription = new Subscription(); // Manage subscriptions

constructor(private router: Router, private couponsService: CouponsService) {}

ngOnInit(): void {
  this.getAllCoupons();
}

ngOnDestroy(): void {
  this.subs.unsubscribe();
}

/**
 * Fetch all coupons for the table
 */
getAllCoupons() {
  this.subs.add(
    this.couponsService.getAllCoupons().subscribe({
      next: (res) => {
        this.couponsDetailsData.data = res.data;
      }
    })
  );
}

/**
 * Navigate to create coupon page
 */
handleCreateAction() {
  this.router.navigateByUrl('/coupon-master/create');
}

/**
 * Delete coupon and refresh the list
 * @param event coupon_id
 */
handleDeleteAction(event: any) {
  this.subs.add(
    this.couponsService.deleteCoupon(event).subscribe({
      next: () => this.getAllCoupons()
    })
  );
}

/**
 * Navigate to edit coupon page
 * @param event coupon_id
 */
handleEditAction(event: any) {
  this.router.navigateByUrl(`/coupon-master/edit/${event}`);
}

/**
 * Navigate to view coupon page
 * @param event coupon_id
 */
handleViewAction(event: any) {
  this.router.navigateByUrl(`/coupon-master/view/${event}`);
}
}

