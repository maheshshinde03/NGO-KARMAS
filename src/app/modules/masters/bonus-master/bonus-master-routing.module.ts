import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BonusMasterComponent } from './bonus-master.component';
import { ModifyBonusMasterComponent } from './modify-bonus-master/modify-bonus-master.component';

/**
 * Routes for Bonus Master management
 */
const routes: Routes = [
  {
    path: '',
    component: BonusMasterComponent,
    data: {
      title: 'Bonus Master List',
      breadcrumb: 'Bonus Master List'
    }
  },
  {
    path: 'create',
    component: ModifyBonusMasterComponent,
    data: {
      title: 'Create Bonus Master',
      breadcrumb: 'Create Bonus Master'
    }
  },
  {
    path: 'edit/:id',
    component: ModifyBonusMasterComponent,
    data: {
      title: 'Edit Bonus Master',
      breadcrumb: 'Edit Bonus Master'
    }
  },
  {
    path: 'view/:id',
    component: ModifyBonusMasterComponent,
    data: {
      title: 'View Bonus Master',
      breadcrumb: 'View Bonus Master'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BonusMasterRoutingModule { }
