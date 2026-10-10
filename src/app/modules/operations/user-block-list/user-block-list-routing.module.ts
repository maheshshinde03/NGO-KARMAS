import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { USERBlockListComponent } from './user-block-list.component';
import { ModifyUserBlockListComponent } from './modify-user-block-list/modify-user-block-list.component';

const routes: Routes = [
  {
    path: '', component: USERBlockListComponent,
    data: {
      title: "USER Block List",
      breadcrumb: "USER Block List",
    }
  },
  {
    path: 'create', component: ModifyUserBlockListComponent,
    data: {
      title: "Create Block Users",
      breadcrumb: "Create Block Users",
    }
  },
  {
    path: 'edit/:id', component: ModifyUserBlockListComponent,
    data: {
      title: "Edit Block Users",
      breadcrumb: "Edit Block Users",
    }
  },
  {
    path: 'view/:id', component: ModifyUserBlockListComponent,
    data: {
      title: "View Block Users",
      breadcrumb: "View Block Users",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class USERBlockListRoutingModule { }
