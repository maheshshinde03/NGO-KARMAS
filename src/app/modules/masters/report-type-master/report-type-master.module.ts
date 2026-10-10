import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportTypeMasterRoutingModule } from './report-type-master-routing.module';
import { ReportTypeMasterService } from '@shared/_http/report-type-master.service';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { ReportTypeMasterComponent } from './report-type-master.component';
import { ModifyReportTypeMasterComponent } from './modify-report-type-master/modify-report-type-master.component';


@NgModule({
  declarations: [ReportTypeMasterComponent,ModifyReportTypeMasterComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    ReportTypeMasterRoutingModule
  ],
  providers:[ReportTypeMasterService]
})
export class ReportTypeMasterModule { }
