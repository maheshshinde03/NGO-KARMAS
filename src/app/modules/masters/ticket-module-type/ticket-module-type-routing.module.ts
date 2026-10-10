import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketModuleTypeComponent } from './ticket-module-type.component';
import { ModifyTicketModuleTypeComponent } from './modify-ticket-module-type/modify-ticket-module-type.component';

const routes: Routes = [
  {
    path: '', component: TicketModuleTypeComponent,
    data: {
      title: "Ticket Module Type List",
      breadcrumb: "Ticket Module Type List",
    }
  },
  {
    path: 'create', component: ModifyTicketModuleTypeComponent,
    data: {
      title: "Create Ticket Module Type",
      breadcrumb: "Create Ticket Module Type",
    }
  },
  {
    path: 'edit/:id', component: ModifyTicketModuleTypeComponent,
    data: {
      title: "Edit Ticket Module Type",
      breadcrumb: "Edit Ticket Module Type",
    }
  },
  {
    path: 'view/:id', component: ModifyTicketModuleTypeComponent,
    data: {
      title: "View Ticket Module Type",
      breadcrumb: "View Ticket Module Type",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketModuleTypeRoutingModule { }
