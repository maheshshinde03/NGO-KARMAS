import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CouponMasterRoutingModule } from './coupon-master-routing.module';
import { CouponMasterComponent } from './coupon-master.component';
import { ModifyCouponMasterComponent } from './modify-coupon-master/modify-coupon-master.component';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';
import { CouponsService } from '@shared/_http/coupons.service';
import { GiftMasterService } from '@shared/_http/gift-master.service';


@NgModule({
  declarations: [CouponMasterComponent,ModifyCouponMasterComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    CouponMasterRoutingModule
  ],
  providers:[CouponsService,GiftMasterService]
})
export class CouponMasterModule { }
