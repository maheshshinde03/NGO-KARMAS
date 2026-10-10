import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftMasterRoutingModule } from './gift-master-routing.module';
import { GiftMasterComponent } from './gift-master.component';
import { ModifyGiftMasterComponent } from './modify-gift-master/modify-gift-master.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { GiftMasterService } from '@shared/_http/gift-master.service';
import { GiftCompanyMasterService } from '@shared/_http/gift-company-master.service';


@NgModule({
  declarations: [GiftMasterComponent,ModifyGiftMasterComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    GiftMasterRoutingModule
  ],
  providers:[GiftMasterService,GiftCompanyMasterService]
})
export class GiftMasterModule { }
