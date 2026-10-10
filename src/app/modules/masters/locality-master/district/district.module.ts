import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictRoutingModule } from './district-routing.module';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';
import { DistrictComponent } from './district.component';
import { ModifyDistrictComponent } from './modify-district/modify-district.component';
import { StateService } from '@shared/_http/state.service';
import { DistrictService } from '@shared/_http/district.service';


@NgModule({
  declarations: [DistrictComponent,ModifyDistrictComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    DistrictRoutingModule
  ],
  providers:[StateService,DistrictService]
})
export class DistrictModule { }
