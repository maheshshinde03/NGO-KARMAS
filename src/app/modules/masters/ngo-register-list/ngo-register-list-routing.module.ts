import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgoRegisterListComponent } from './ngo-register-list.component';
import { ModifyNgoRequestsComponent } from '@modules/operations/ngo-requests/modify-ngo-requests/modify-ngo-requests.component';
import { ModifyNgoRegisterListComponent } from './modify-ngo-register-list/modify-ngo-register-list.component';


/**
 * Routes for NGO Field management
 */
const routes: Routes = [
  {
    path: '',
    component: NgoRegisterListComponent,
    data: {
      title: 'Ngo Verification List',
      breadcrumb: 'Ngo Verification List'
    }
  },
  {
    path: 'create',
    component: ModifyNgoRegisterListComponent,
    data: {
      title: 'Create Ngo Verification',
      breadcrumb: 'Create Ngo Verification'
    }
  },
  {
    path: 'edit/:id',
    component: ModifyNgoRegisterListComponent,
    data: {
      title: 'Edit Ngo Verification',
      breadcrumb: 'Edit Ngo Verification'
    }
  },
  {
    path: 'view/:id',
    component: ModifyNgoRegisterListComponent,
    data: {
      title: 'View Ngo Verification',
      breadcrumb: 'View Ngo Verification'
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgoRegisterListRoutingModule { }
