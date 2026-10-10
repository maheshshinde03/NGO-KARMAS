import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagePermissionTableComponent } from './page-permission-table.component';

const routes: Routes = [
  {
    path: '', component: PagePermissionTableComponent,
    data: {
        title: "Pages",
        breadcrumb: "Pages",
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagePermissionTableRoutingModule { }
