import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModifyStateComponent } from './modify-state/modify-state.component';
import { StateComponent } from './state.component';

const routes: Routes = [
  {
    path: '', component: StateComponent,
    data: {
      title: 'State List',
      breadcrumb: 'State List',
    }
  },
  {
    path: 'create', component: ModifyStateComponent,
    data: {
      title: 'Create State',
      breadcrumb: 'Create State',
    }
  },
  {
    path: 'edit/:id', component: ModifyStateComponent,
    data: {
      title: 'Edit State',
      breadcrumb: 'Edit State',
    }
  },
  {
    path: 'view/:id', component: ModifyStateComponent,
    data: {
      title: 'View State',
      breadcrumb: 'View State',
    }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StateRoutingModule { }
