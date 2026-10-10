import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusMasterComponent } from './status-master.component';
import { ModifyStatusMasterComponent } from './modify-status-master/modify-status-master.component';

const routes: Routes = [
  {
      path: '', component: StatusMasterComponent,
      data: {
          title: "Status Master List",
          breadcrumb: "Status Master List",
      }
  },
  {
      path: 'create', component: ModifyStatusMasterComponent,
      data: {
          title: "Create Status Master",
          breadcrumb: "Create Status Master",
      }
  },
  {
      path: 'edit/:id', component: ModifyStatusMasterComponent,
      data: {
          title: "Edit Status Master",
          breadcrumb: "Edit Status Master",
      }
  },
  {
      path: 'view/:id', component: ModifyStatusMasterComponent,
      data: {
          title: "View Status Master",
          breadcrumb: "View Status Master",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusMasterRoutingModule { }
