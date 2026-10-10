import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgoFieldMasterComponent } from './ngo-field-master.component';
import { ModifyNgoFieldMasterComponent } from './modify-ngo-field-master/modify-ngo-field-master.component';

/**
 * Routes for NGO Field management
 */
const routes: Routes = [
  {
    path: '',
    component: NgoFieldMasterComponent,
    data: {
      title: 'Ngo Working Field List',
      breadcrumb: 'Ngo Working Field List'
    }
  },
  {
    path: 'create',
    component: ModifyNgoFieldMasterComponent,
    data: {
      title: 'Create Ngo Working Field',
      breadcrumb: 'Create Ngo Working Field'
    }
  },
  {
    path: 'edit/:id',
    component: ModifyNgoFieldMasterComponent,
    data: {
      title: 'Edit Ngo Working Field',
      breadcrumb: 'Edit Ngo Working Field'
    }
  },
  {
    path: 'view/:id',
    component: ModifyNgoFieldMasterComponent,
    data: {
      title: 'View Ngo Working Field',
      breadcrumb: 'View Ngo Working Field'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgoFieldMasterRoutingModule { }
