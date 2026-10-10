import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpowermentCallRoutingModule } from './empowerment-call-routing.module';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { CountryService } from '@shared/_http/country.service';
import { StateService } from '@shared/_http/state.service';
import { CityService } from '@shared/_http/city.service';
import { EmpowermentCallComponent } from './empowerment-call.component';
import { ModifyEmpowermentCallComponent } from './modify-empowerment-call/modify-empowerment-call.component';


@NgModule({
  declarations: [EmpowermentCallComponent,ModifyEmpowermentCallComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    EmpowermentCallRoutingModule
  ],
  providers: [CityService,CountryService,StateService]
})
export class EmpowermentCallModule { }
