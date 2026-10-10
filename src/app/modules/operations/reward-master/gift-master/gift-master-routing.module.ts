import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftMasterComponent } from './gift-master.component';
import { ModifyGiftMasterComponent } from './modify-gift-master/modify-gift-master.component';

const routes: Routes = [
  {
    path: '',
    component: GiftMasterComponent,
    data: {
      title: 'Gift Master List',
      breadcrumb: 'Gift Master List'
    }
  },
  {
    path: 'create',
    component: ModifyGiftMasterComponent,
    data: {
      title: 'Create Gift Master',
      breadcrumb: 'Create Gift Master'
    }
  },
  {
    path: 'edit/:id',
    component: ModifyGiftMasterComponent,
    data: {
      title: 'Edit Gift Master',
      breadcrumb: 'Edit Gift Master'
    }
  },
  {
    path: 'view/:id',
    component: ModifyGiftMasterComponent,
    data: {
      title: 'View Gift Master',
      breadcrumb: 'View Gift Master'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftMasterRoutingModule { }
