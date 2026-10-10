import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketModuleTypeRoutingModule } from './ticket-module-type-routing.module';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { TicketModuleTypeMasterService } from '@shared/_http/ticket-module-type.service';
import { TicketModuleTypeComponent } from './ticket-module-type.component';
import { ModifyTicketModuleTypeComponent } from './modify-ticket-module-type/modify-ticket-module-type.component';


@NgModule({
  declarations: [TicketModuleTypeComponent, ModifyTicketModuleTypeComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    TicketModuleTypeRoutingModule
  ],
  providers: [TicketModuleTypeMasterService]
})
export class TicketModuleTypeModule { }
