import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsComponent } from './requests.component';
import { ModifyRequestsComponent } from './modify-requests/modify-requests.component';

const routes: Routes = [
  {
      path: '', component: RequestsComponent,
      data: {
          title: "Request List",
          breadcrumb: "Request List",
      }
  },
  {
      path: 'create', component: ModifyRequestsComponent,
      data: {
          title: "Create Request",
          breadcrumb: "Create Request",
      }
  },
  {
      path: 'edit/:id', component: ModifyRequestsComponent,
      data: {
          title: "Edit Request",
          breadcrumb: "Edit Request",
      }
  },
  {
      path: 'view/:id', component: ModifyRequestsComponent,
      data: {
          title: "View Request",
          breadcrumb: "View Request",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
