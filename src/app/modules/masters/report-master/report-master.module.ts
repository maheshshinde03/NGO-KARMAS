import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportMasterRoutingModule } from './report-master-routing.module';
import { ReportMasterComponent } from './report-master.component';
import { ModifyReportMasterComponent } from './modify-report-master/modify-report-master.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { ReportMasterService } from '@shared/_http/report-master.service';
import { ReportPageTypeMasterService } from '@shared/_http/report-page-type-master.service';
import { ReportTypeMasterService } from '@shared/_http/report-type-master.service';
import { UserMasterControllerService } from '@shared/_http/user-master.service';


@NgModule({
  declarations: [ReportMasterComponent,ModifyReportMasterComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    ReportMasterRoutingModule
  ],
  providers:[ReportMasterService,ReportPageTypeMasterService,ReportTypeMasterService,UserMasterControllerService]
})
export class ReportMasterModule { }
