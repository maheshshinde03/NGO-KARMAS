import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportPageTypeMasterComponent } from './report-page-type-master.component';
import { ModifyReportPageTypeMasterComponent } from './modify-report-page-type-master/modify-report-page-type-master.component';

const routes: Routes = [
  {
    path: '', component: ReportPageTypeMasterComponent,
    data: {
      title: "Report Page Type List",
      breadcrumb: "Report Page Type List",
    }
  },
  {
    path: 'create', component: ModifyReportPageTypeMasterComponent,
    data: {
      title: "Create Report Page Type",
      breadcrumb: "Create Report Page Type",
    }
  },
  {
    path: 'edit/:id', component: ModifyReportPageTypeMasterComponent,
    data: {
      title: "Edit Report Page Type",
      breadcrumb: "Edit Report Page Type",
    }
  },
  {
    path: 'view/:id', component: ModifyReportPageTypeMasterComponent,
    data: {
      title: "View Report Page Type",
      breadcrumb: "View Report Page Type",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportPageTypeMasterRoutingModule { }
