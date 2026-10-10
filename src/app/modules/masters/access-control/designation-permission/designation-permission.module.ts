import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationPermissionRoutingModule } from './designation-permission-routing.module';
import { DesignationPermissionComponent } from './designation-permission.component';
import { ModifyDesignationMasterComponent } from '@modules/masters/designation-master/modify-designation-master/modify-designation-master.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { DesignationPermissionControllerService } from '@shared/_http/designation-permission.service';
import { ModifyDesignationPermissionComponent } from './modify-designation-permission/modify-designation-permission.component';
import { NGODesignationMasterService } from '@shared/_http/ngo-designation-master.service';


@NgModule({
  declarations: [DesignationPermissionComponent,ModifyDesignationPermissionComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    DesignationPermissionRoutingModule
  ],
  providers:[DesignationPermissionControllerService,NGODesignationMasterService]
})
export class DesignationPermissionModule { }
