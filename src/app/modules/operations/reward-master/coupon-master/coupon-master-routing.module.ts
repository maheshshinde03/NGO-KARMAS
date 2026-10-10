import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CouponMasterComponent } from './coupon-master.component';
import { ModifyCouponMasterComponent } from './modify-coupon-master/modify-coupon-master.component';

const routes: Routes = [
  {
    path: '',
    component: CouponMasterComponent,
    data: {
      title: 'Coupons List',
      breadcrumb: 'Coupons List'
    }
  },
  {
    path: 'create',
    component: ModifyCouponMasterComponent,
    data: {
      title: 'Create Coupon',
      breadcrumb: 'Create Coupon'
    }
  },
  {
    path: 'edit/:id',
    component: ModifyCouponMasterComponent,
    data: {
      title: 'Edit Coupon',
      breadcrumb: 'Edit Coupon'
    }
  },
  {
    path: 'view/:id',
    component: ModifyCouponMasterComponent,
    data: {
      title: 'View Coupon',
      breadcrumb: 'View Coupon'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponMasterRoutingModule { }
