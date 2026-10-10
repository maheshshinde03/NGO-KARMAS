import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityComponent } from './city.component';
import { ModifyCityComponent } from './modify-city/modify-city.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { DistrictService } from '@shared/_http/district.service';
import { StateService } from '@shared/_http/state.service';


@NgModule({
  declarations: [CityComponent,ModifyCityComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    CityRoutingModule
  ],
  providers:[CityService,CountryService,DistrictService,StateService]
})
export class CityModule { }
