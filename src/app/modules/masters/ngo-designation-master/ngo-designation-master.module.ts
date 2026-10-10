import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgoDesignationMasterRoutingModule } from './ngo-designation-master-routing.module';
import { DesignationMasterService } from '@shared/_http/designation-master.service';
import { TableMasterService } from '@shared/_http/table-master.service';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { NgoDesignationMasterComponent } from './ngo-designation-master.component';
import { ModifyNgoDesignationMasterComponent } from './modify-ngo-designation-master/modify-ngo-designation-master.component';
import { NGODesignationMasterService } from '@shared/_http/ngo-designation-master.service';


@NgModule({
  declarations: [NgoDesignationMasterComponent, ModifyNgoDesignationMasterComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    NgoDesignationMasterRoutingModule
  ],
  providers: [NGODesignationMasterService, TableMasterService]
})
export class NgoDesignationMasterModule { }
