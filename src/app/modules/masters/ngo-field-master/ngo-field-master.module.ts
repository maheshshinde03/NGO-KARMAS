import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgoFieldMasterRoutingModule } from './ngo-field-master-routing.module';
import { NgoFieldMasterComponent } from './ngo-field-master.component';
import { ModifyNgoFieldMasterComponent } from './modify-ngo-field-master/modify-ngo-field-master.component';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { RequestsTypeService } from '@shared/_http/requestsType.service';


@NgModule({
  declarations: [NgoFieldMasterComponent,ModifyNgoFieldMasterComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    NgoFieldMasterRoutingModule
  ],
  providers:[NGOFieldService,RequestsTypeService]
})
export class NgoFieldMasterModule { }
