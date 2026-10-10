import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportPageTypeMasterRoutingModule } from './report-page-type-master-routing.module';
import { ReportPageTypeMasterService } from '@shared/_http/report-page-type-master.service';
import { ReportPageTypeMasterComponent } from './report-page-type-master.component';
import { ModifyReportPageTypeMasterComponent } from './modify-report-page-type-master/modify-report-page-type-master.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';


@NgModule({
  declarations: [ReportPageTypeMasterComponent, ModifyReportPageTypeMasterComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    ReportPageTypeMasterRoutingModule
  ],
  providers: [ReportPageTypeMasterService]
})
export class ReportPageTypeMasterModule { }
