import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyEmpowermentCallComponent } from './modify-empowerment-call/modify-empowerment-call.component';
import { EmpowermentCallComponent } from './empowerment-call.component';

const routes: Routes = [
  {
      path: '', component: EmpowermentCallComponent,
      data: {
          title: "Empowerment Call List",
          breadcrumb: "Empowerment Call List",
      }
  },
  {
      path: 'create', component: ModifyEmpowermentCallComponent,
      data: {
          title: "Create Empowerment Call",
          breadcrumb: "Create Empowerment Call",
      }
  },
  {
      path: 'edit/:id', component: ModifyEmpowermentCallComponent,
      data: {
          title: "Edit Empowerment Call",
          breadcrumb: "Edit Empowerment Call",
      }
  },
  {
      path: 'view/:id', component: ModifyEmpowermentCallComponent,
      data: {
          title: "View Empowerment Call",
          breadcrumb: "View Empowerment Call",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpowermentCallRoutingModule { }
