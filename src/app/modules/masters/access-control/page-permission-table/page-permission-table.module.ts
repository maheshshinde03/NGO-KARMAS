import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagePermissionTableRoutingModule } from './page-permission-table-routing.module';
import { PagePermissionTableComponent } from './page-permission-table.component';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { FormComponent } from '@shared/component/form/form.component';
import { PermissionPageTableControllerService } from '@shared/_http/permissions-table.service';
import { FeathericonComponent } from '@shared/component/feathericon/feathericon.component';


@NgModule({
  declarations: [PagePermissionTableComponent],
  imports: [
    CommonModule,
    FormComponent,
    FeathericonComponent,
    PagePermissionTableRoutingModule
  ],
  providers:[PermissionControllerService,PermissionPageTableControllerService]
})
export class PagePermissionTableModule { }
