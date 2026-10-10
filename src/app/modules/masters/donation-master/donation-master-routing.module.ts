import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DonationMasterComponent } from './donation-master.component';

const routes: Routes = [
  {
    path: '',
    component: DonationMasterComponent,
    data: {
      title: 'Donation Master List',
      breadcrumb: 'Donation Master List'
    }
  },
  // {
  //   path: 'create',
  //   component: ModifyNgoDesignationMasterComponent,
  //   data: {
  //     title: 'Create Designation Master',
  //     breadcrumb: 'Create Designation Master'
  //   }
  // },
  // {
  //   path: 'edit/:id',
  //   component: ModifyNgoDesignationMasterComponent,
  //   data: {
  //     title: 'Edit Designation Master',
  //     breadcrumb: 'Edit Designation Master'
  //   }
  // },
  // {
  //   path: 'view/:id',
  //   component: ModifyNgoDesignationMasterComponent,
  //   data: {
  //     title: 'View Designation Master',
  //     breadcrumb: 'View Designation Master'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationMasterRoutingModule { }
