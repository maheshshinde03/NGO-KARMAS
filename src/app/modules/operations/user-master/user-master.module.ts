import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMasterRoutingModule } from './user-master-routing.module';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { StateService } from '@shared/_http/state.service';
import { UserMasterControllerService } from '@shared/_http/user-master.service';
import { UserMasterComponent } from './user-master.component';
import { ModifyUserMasterComponent } from './modify-user-master/modify-user-master.component';
import { UserService } from '@shared/_http/user_master.service';
import { DashboardCardComponent } from '@shared/component/dashboard-card/dashboard-card.component';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { NgoControllerService } from '@shared/_http/ngo-master.service';

@NgModule({
  declarations: [UserMasterComponent,ModifyUserMasterComponent],
  imports: [
    CommonModule,
    FormComponent,
    DashboardCardComponent,
    TableComponent,
    UserMasterRoutingModule
  ],
  providers: [CityService,CountryService,StateService,UserService,PermissionControllerService,NgoControllerService]
})
export class UserMasterModule { }
