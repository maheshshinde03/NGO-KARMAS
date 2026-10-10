import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignationPermissionComponent } from './designation-permission.component';
import { ModifyDesignationMasterComponent } from '@modules/masters/designation-master/modify-designation-master/modify-designation-master.component';
import { ModifyDesignationPermissionComponent } from './modify-designation-permission/modify-designation-permission.component';

const routes: Routes = [
  {
    path: '', component: DesignationPermissionComponent,
    data: {
        title: "Designation permission List",
        breadcrumb: "Designation permission List",
    }
  },
  {
      path: 'create', component: ModifyDesignationPermissionComponent,
      data: {
          title: "Designation permission Create",
          breadcrumb: "Designation permission Create",
      }
  },
  {
      path: 'edit/:id', component: ModifyDesignationPermissionComponent,
      data: {
          title: "Edit Designation permission",
          breadcrumb: "Edit Designation permission",
      }
  },
  {
      path: 'view/:id', component: ModifyDesignationPermissionComponent,
      data: {
          title: "View Designation permission",
          breadcrumb: "View Designation permission",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationPermissionRoutingModule { }
