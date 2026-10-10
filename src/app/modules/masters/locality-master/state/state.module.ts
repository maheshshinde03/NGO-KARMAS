import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateRoutingModule } from './state-routing.module';
import { StateComponent } from './state.component';
import { ModifyStateComponent } from './modify-state/modify-state.component';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';
import { StateService } from '@shared/_http/state.service';
import { CountryService } from '@shared/_http/country.service';


@NgModule({
  declarations: [StateComponent,ModifyStateComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    StateRoutingModule
  ],
  providers:[StateService,CountryService]
})
export class StateModule { }
