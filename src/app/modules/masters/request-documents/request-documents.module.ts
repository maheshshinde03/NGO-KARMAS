import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestDocumentsRoutingModule } from './request-documents-routing.module';
import { RequestDocumentsComponent } from './request-documents.component';
import { ModifyRequestDocumentsComponent } from './modify-request-documents/modify-request-documents.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { RequestDocumentsMasterService } from '@shared/_http/request-documents-master.service';


@NgModule({
  declarations: [RequestDocumentsComponent, ModifyRequestDocumentsComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    RequestDocumentsRoutingModule
  ],
  providers:[RequestDocumentsMasterService]
})
export class RequestDocumentsModule { }
