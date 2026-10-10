import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { DashboardCardComponent } from '@shared/component/dashboard-card/dashboard-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgoRequestsRoutingModule } from './ngo-requests-routing.module';
import { NgoRequestsComponent } from './ngo-requests.component';
import { ModifyNgoRequestsComponent } from './modify-ngo-requests/modify-ngo-requests.component';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { StateService } from '@shared/_http/state.service';
import { RequestsService } from '@shared/_http/requests.service';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { RequestsTypeService } from '@shared/_http/requestsType.service';
import { RequestNgoPopupComponent } from './request-ngo-popup/request-ngo-popup.component';
import { ModifyNgoRequestsSelfComponent } from './modify-ngo-requests-self/modify-ngo-requests-self.component';


@NgModule({
  declarations: [NgoRequestsComponent,ModifyNgoRequestsComponent,RequestNgoPopupComponent,ModifyNgoRequestsSelfComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormComponent,
    TableComponent,
    DashboardCardComponent,
    NgoRequestsRoutingModule
  ],
  providers: [CityService,CountryService,StateService,RequestsService,NgoControllerService,NGOFieldService,RequestsTypeService]
})
export class NgoRequestsModule { }
