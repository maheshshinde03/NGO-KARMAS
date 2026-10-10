import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { ModifyCountryComponent } from './modify-country/modify-country.component';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';
import { CountryService } from '@shared/_http/country.service';
import { DistrictService } from '@shared/_http/district.service';


@NgModule({
  declarations: [CountryComponent,ModifyCountryComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    CountryRoutingModule
  ],
  providers:[CountryService,DistrictService,CountryService]
})
export class CountryModule { }
