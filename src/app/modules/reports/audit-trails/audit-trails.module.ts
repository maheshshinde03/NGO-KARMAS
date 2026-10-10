import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditTrailsRoutingModule } from './audit-trails-routing.module';
import { AuditTrailsComponent } from './audit-trails.component';
import { AuditTrailService } from '@shared/_http/audit-trail.service';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';


@NgModule({
  declarations: [AuditTrailsComponent],
  imports: [
    CommonModule,
    AuditTrailsRoutingModule,
    FormComponent,
    TableComponent
  ],
  providers:[ AuditTrailService]
})
export class AuditTrailsModule { }
