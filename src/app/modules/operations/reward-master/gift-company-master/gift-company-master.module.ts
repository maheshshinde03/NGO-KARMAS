import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GiftCompanyMasterRoutingModule } from './gift-company-master-routing.module';
import { GiftCompanyMasterComponent } from './gift-company-master.component';
import { ModifyGiftCompanyMasterComponent } from './modify-gift-company-master/modify-gift-company-master.component';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';
import { GiftCompanyMasterService } from '@shared/_http/gift-company-master.service';


@NgModule({
  declarations: [GiftCompanyMasterComponent,ModifyGiftCompanyMasterComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    GiftCompanyMasterRoutingModule
  ],
  providers:[GiftCompanyMasterService]
})
export class GiftCompanyMasterModule { }
