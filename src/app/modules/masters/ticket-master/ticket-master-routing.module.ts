import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketMasterComponent } from './ticket-master.component';
import { ModifyTicketMasterComponent } from './modify-ticket-master/modify-ticket-master.component';

const routes: Routes = [
  {
    path: '', component: TicketMasterComponent,
    data: {
      title: "Ticket Master List",
      breadcrumb: "Ticket Master List",
    }
  },
  {
    path: 'create', component: ModifyTicketMasterComponent,
    data: {
      title: "Create Ticket Master",
      breadcrumb: "Create Ticket Master",
    }
  },
  {
    path: 'edit/:id', component: ModifyTicketMasterComponent,
    data: {
      title: "Edit Ticket Master",
      breadcrumb: "Edit Ticket Master",
    }
  },
  {
    path: 'view/:id', component: ModifyTicketMasterComponent,
    data: {
      title: "View Ticket Master",
      breadcrumb: "View Ticket Master",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketMasterRoutingModule { }
