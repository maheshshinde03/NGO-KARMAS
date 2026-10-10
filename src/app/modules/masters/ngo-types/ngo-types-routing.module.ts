import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgoTypesComponent } from './ngo-types.component';
import { ModifyNgoTypesComponent } from './modify-ngo-types/modify-ngo-types.component';

const routes: Routes = [
  {
    path: '',
    component: NgoTypesComponent,
    data: {
      title: 'Ngo Type List',
      breadcrumb: 'Ngo Type List'
    }
  },
  {
    path: 'create',
    component: ModifyNgoTypesComponent,
    data: {
      title: 'Create Ngo Type',
      breadcrumb: 'Create Ngo Type'
    }
  },
  {
    path: 'edit/:id',
    component: ModifyNgoTypesComponent,
    data: {
      title: 'Edit Ngo Type',
      breadcrumb: 'Edit Ngo Type'
    }
  },
  {
    path: 'view/:id',
    component: ModifyNgoTypesComponent,
    data: {
      title: 'View Ngo Type',
      breadcrumb: 'View Ngo Type'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgoTypesRoutingModule { }
