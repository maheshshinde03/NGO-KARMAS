import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgoRegisterListRoutingModule } from './ngo-register-list-routing.module';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { NgoRegisterListComponent } from './ngo-register-list.component';
import { ModifyNgoRegisterListComponent } from './modify-ngo-register-list/modify-ngo-register-list.component';
import { NgoControllerService } from '@shared/_http/ngo-master.service';


@NgModule({
  declarations: [NgoRegisterListComponent, ModifyNgoRegisterListComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    NgoRegisterListRoutingModule
  ],
  providers: [NgoControllerService]
})
export class NgoRegisterListModule { }
