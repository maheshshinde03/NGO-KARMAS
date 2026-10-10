import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgoRoutingModule } from './ngo-routing.module';
import { NgoComponent } from './ngo.component';
import { ModifyNgoComponent } from './modify-ngo/modify-ngo.component';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { StateService } from '@shared/_http/state.service';
import { MatStepperComponent } from '@shared/component/mat-stepper/mat-stepper.component';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { DistrictService } from '@shared/_http/district.service';
import { PopupFormComponent } from '@shared/component/popup-form/popup-form.component';
import { DesignationServiceController } from '@shared/_http/designation.service';
import { DashboardCardComponent } from '@shared/component/dashboard-card/dashboard-card.component';
import { NGOTypesService } from '@shared/_http/ngo-types.service';
import { ModifyNgoWithMediaComponent } from './modify-ngo-with-media/modify-ngo-with-media.component';
import { FeathericonComponent } from '@shared/component/feathericon/feathericon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '@shared/_http/user_master.service';
import { RequestDocumentsMasterService } from '@shared/_http/request-documents-master.service';
import { RequestsService } from '@shared/_http/requests.service';


@NgModule({
  declarations: [NgoComponent, ModifyNgoComponent, ModifyNgoWithMediaComponent],
  imports: [
    CommonModule,
    MatStepperComponent,
    FormComponent,
    FormsModule,
    ReactiveFormsModule,
    TableComponent,
    PopupFormComponent,
    DashboardCardComponent,
    FeathericonComponent,
    NgoRoutingModule
  ],
  providers: [CityService, CountryService, StateService, NgoControllerService, NGOFieldService, DistrictService, DesignationServiceController, NGOTypesService, UserService,RequestDocumentsMasterService,RequestsService]
})
export class NgoModule { }
