import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgoUserMasterRoutingModule } from './ngo-user-master-routing.module';
import { DashboardCardComponent } from '@shared/component/dashboard-card/dashboard-card.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { NgoUserMasterComponent } from './ngo-user-master.component';
import { ModifyUserMasterComponent } from '../user-master/modify-user-master/modify-user-master.component';
import { ModifyNgoUserMasterComponent } from './modify-ngo-user-master/modify-ngo-user-master.component';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { StateService } from '@shared/_http/state.service';
import { UserService } from '@shared/_http/user_master.service';
import { NGODesignationMasterService } from '@shared/_http/ngo-designation-master.service';


@NgModule({
  declarations: [NgoUserMasterComponent,ModifyNgoUserMasterComponent],
  imports: [
    CommonModule,
    FormComponent,
    DashboardCardComponent,
    TableComponent,
    NgoUserMasterRoutingModule
  ],
  providers: [CityService,CountryService,StateService,UserService,PermissionControllerService,NgoControllerService,NGODesignationMasterService]
})
export class NgoUserMasterModule { }
