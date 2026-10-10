import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationMasterRoutingModule } from './donation-master-routing.module';
import { DonationMasterComponent } from './donation-master.component';


@NgModule({
  declarations: [DonationMasterComponent],
  imports: [
    CommonModule,
    DonationMasterRoutingModule
  ]
})
export class DonationMasterModule { }
