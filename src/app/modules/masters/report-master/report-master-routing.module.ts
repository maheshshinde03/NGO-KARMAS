import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportMasterComponent } from './report-master.component';
import { ModifyReportMasterComponent } from './modify-report-master/modify-report-master.component';

const routes: Routes = [
  {
      path: '', component: ReportMasterComponent,
      data: {
          title: "Report List",
          breadcrumb: "Report List",
      }
  },
  {
      path: 'create', component: ModifyReportMasterComponent,
      data: {
          title: "Create Report",
          breadcrumb: "Create Report",
      }
  },
  {
      path: 'edit/:id', component: ModifyReportMasterComponent,
      data: {
          title: "Edit Report",
          breadcrumb: "Edit Report",
      }
  },
  {
      path: 'view/:id', component: ModifyReportMasterComponent,
      data: {
          title: "View Report",
          breadcrumb: "View Report",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportMasterRoutingModule { }
