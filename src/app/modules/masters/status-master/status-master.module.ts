import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusMasterRoutingModule } from './status-master-routing.module';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { StatusMasterComponent } from './status-master.component';
import { ModifyStatusMasterComponent } from './modify-status-master/modify-status-master.component';
import { StatusMasterService } from '@shared/_http/status.service';


@NgModule({
  declarations: [StatusMasterComponent,ModifyStatusMasterComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    StatusMasterRoutingModule
  ],
  providers: [StatusMasterService]
})
export class StatusMasterModule { }
