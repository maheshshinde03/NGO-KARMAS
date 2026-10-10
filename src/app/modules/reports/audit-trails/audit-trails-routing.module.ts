import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditTrailsComponent } from './audit-trails.component';

const routes: Routes = [{
  path: '', component: AuditTrailsComponent,
  data: {
    title: "Audit Trail List",
    breadcrumb: "Audit Trail List",
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditTrailsRoutingModule { }
