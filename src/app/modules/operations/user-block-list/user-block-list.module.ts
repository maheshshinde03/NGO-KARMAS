import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { USERBlockListRoutingModule } from './user-block-list-routing.module';
import { USERBlockListComponent } from './user-block-list.component';
import { TableComponent } from '@shared/component/table/table.component';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { UserService } from '@shared/_http/user_master.service';
import { ModifyUserBlockListComponent } from './modify-user-block-list/modify-user-block-list.component';
import { FormComponent } from '@shared/component/form/form.component';


@NgModule({
  declarations: [USERBlockListComponent,ModifyUserBlockListComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    USERBlockListRoutingModule
  ],
  providers: [NgoControllerService,UserService],
})
export class USERBlockListModule { }
