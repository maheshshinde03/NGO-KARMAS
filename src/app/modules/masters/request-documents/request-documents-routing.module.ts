import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestDocumentsComponent } from './request-documents.component';
import { ModifyRequestDocumentsComponent } from './modify-request-documents/modify-request-documents.component';

const routes: Routes = [
  {
      path: '', component: RequestDocumentsComponent,
      data: {
          title: "Request Documnets Type List",
          breadcrumb: "Request Documnets Type List",
      }
  },
  {
      path: 'create', component: ModifyRequestDocumentsComponent,
      data: {
          title: "Create Request Documnets Type",
          breadcrumb: "Create Request Documnets Type",
      }
  },
  {
      path: 'edit/:id', component: ModifyRequestDocumentsComponent,
      data: {
          title: "Edit Request Documnets Type",
          breadcrumb: "Edit Request Documnets Type",
      }
  },
  {
      path: 'view/:id', component: ModifyRequestDocumentsComponent,
      data: {
          title: "View Request Documnets Type",
          breadcrumb: "View Request Documnets Type",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestDocumentsRoutingModule { }
