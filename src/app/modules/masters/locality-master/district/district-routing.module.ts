import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictComponent } from './district.component';
import { ModifyDistrictComponent } from './modify-district/modify-district.component';

const routes: Routes = [
  {
    path: '', component: DistrictComponent,
    data: {
      title: 'District List',
      breadcrumb: 'District List',
    }
  },
  {
    path: 'create', component: ModifyDistrictComponent,
    data: {
      title: 'Create District',
      breadcrumb: 'Create District',
    }
  },
  {
    path: 'edit/:id', component: ModifyDistrictComponent,
    data: {
      title: 'Edit District',
      breadcrumb: 'Edit District',
    }
  },
  {
    path: 'view/:id', component: ModifyDistrictComponent,
    data: {
      title: 'View District',
      breadcrumb: 'View District',
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictRoutingModule { }
