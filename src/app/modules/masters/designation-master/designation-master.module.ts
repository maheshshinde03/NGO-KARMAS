import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationMasterRoutingModule } from './designation-master-routing.module';
import { DesignationMasterComponent } from './designation-master.component';
import { ModifyDesignationMasterComponent } from './modify-designation-master/modify-designation-master.component';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';
import { DesignationMasterService } from '@shared/_http/designation-master.service';
import { TableMasterService } from '@shared/_http/table-master.service';


@NgModule({
  declarations: [DesignationMasterComponent,ModifyDesignationMasterComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    DesignationMasterRoutingModule
  ],
  providers:[DesignationMasterService,TableMasterService]
})
export class DesignationMasterModule { }
