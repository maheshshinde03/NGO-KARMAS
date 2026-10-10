import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { ModifyRequestsComponent } from './modify-requests/modify-requests.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { StateService } from '@shared/_http/state.service';
import { RequestsService } from '@shared/_http/requests.service';
import { DashboardCardComponent } from '@shared/component/dashboard-card/dashboard-card.component';
import { RequestNgoPopupComponent } from './request-ngo-popup/request-ngo-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { RequestsTypeService } from '@shared/_http/requestsType.service';
import { RequestDocumentsMasterService } from '@shared/_http/request-documents-master.service';

@NgModule({
  declarations: [RequestsComponent,ModifyRequestsComponent,RequestNgoPopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormComponent,
    TableComponent,
    DashboardCardComponent,
    RequestsRoutingModule
  ],
  providers: [CityService,CountryService,StateService,RequestsService,NgoControllerService,NGOFieldService,RequestsTypeService,RequestDocumentsMasterService]
})
export class RequestsModule { }
