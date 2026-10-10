import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftRewardRoutingModule } from './gift-reward-routing.module';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { GiftRewardComponent } from './gift-reward.component';
import { ModifyGiftRewardComponent } from './modify-gift-reward/modify-gift-reward.component';
import { GiftAndRewardControllerService } from '@shared/_http/giftAndReward-master.service';


@NgModule({
  declarations: [GiftRewardComponent,ModifyGiftRewardComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    GiftRewardRoutingModule
  ],
  providers:[GiftAndRewardControllerService]
})
export class GiftRewardModule { }
