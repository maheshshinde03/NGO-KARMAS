import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketMasterRoutingModule } from './ticket-master-routing.module';
import { TicketMasterComponent } from './ticket-master.component';
import { ModifyTicketMasterComponent } from './modify-ticket-master/modify-ticket-master.component';
import { TicketMasterService } from '@shared/_http/ticket-master.service';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';


@NgModule({
  declarations: [TicketMasterComponent,ModifyTicketMasterComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    TicketMasterRoutingModule
  ],
  providers:[TicketMasterService]
})
export class TicketMasterModule { }
