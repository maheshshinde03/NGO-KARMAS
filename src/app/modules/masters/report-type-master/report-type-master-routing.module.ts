import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportTypeMasterComponent } from './report-type-master.component';
import { ModifyReportTypeMasterComponent } from './modify-report-type-master/modify-report-type-master.component';

const routes: Routes = [
  {
    path: '', component: ReportTypeMasterComponent,
    data: {
      title: "Report Type List",
      breadcrumb: "Report Type List",
    }
  },
  {
    path: 'create', component: ModifyReportTypeMasterComponent,
    data: {
      title: "Create Report Type",
      breadcrumb: "Create Report Type",
    }
  },
  {
    path: 'edit/:id', component: ModifyReportTypeMasterComponent,
    data: {
      title: "Edit Report Type",
      breadcrumb: "Edit Report Type",
    }
  },
  {
    path: 'view/:id', component: ModifyReportTypeMasterComponent,
    data: {
      title: "View Report Type",
      breadcrumb: "View Report Type",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportTypeMasterRoutingModule { }
