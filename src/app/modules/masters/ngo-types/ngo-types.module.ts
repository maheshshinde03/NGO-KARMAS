import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgoTypesRoutingModule } from './ngo-types-routing.module';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { NgoTypeService } from '@shared/_http/ngo-type.service';
import { NgoTypesComponent } from './ngo-types.component';
import { ModifyNgoTypesComponent } from './modify-ngo-types/modify-ngo-types.component';


@NgModule({
  declarations: [NgoTypesComponent,ModifyNgoTypesComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    NgoTypesRoutingModule
  ],
  providers:[NgoTypeService]
})
export class NgoTypesModule { }
