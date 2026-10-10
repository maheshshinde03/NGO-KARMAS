import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignationMasterComponent } from './designation-master.component';
import { ModifyDesignationMasterComponent } from './modify-designation-master/modify-designation-master.component';

/**
 * Routes for Designation Master management module
 */
const routes: Routes = [
  {
    path: '',
    component: DesignationMasterComponent,
    data: {
      title: 'Designation Master List',
      breadcrumb: 'Designation Master List'
    }
  },
  {
    path: 'create',
    component: ModifyDesignationMasterComponent,
    data: {
      title: 'Create Designation Master',
      breadcrumb: 'Create Designation Master'
    }
  },
  {
    path: 'edit/:id',
    component: ModifyDesignationMasterComponent,
    data: {
      title: 'Edit Designation Master',
      breadcrumb: 'Edit Designation Master'
    }
  },
  {
    path: 'view/:id',
    component: ModifyDesignationMasterComponent,
    data: {
      title: 'View Designation Master',
      breadcrumb: 'View Designation Master'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationMasterRoutingModule { }
