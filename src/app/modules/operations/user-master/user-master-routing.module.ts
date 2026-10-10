import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMasterComponent } from './user-master.component';
import { ModifyUserMasterComponent } from './modify-user-master/modify-user-master.component';

const routes: Routes = [
  {
      path: '', component: UserMasterComponent,
      data: {
          title: "Users List",
          breadcrumb: "Users List",
      }
  },
  {
      path: 'create', component: ModifyUserMasterComponent,
      data: {
          title: "Create Users",
          breadcrumb: "Create Users",
      }
  },
  {
      path: 'edit/:id', component: ModifyUserMasterComponent,
      data: {
          title: "Edit Users",
          breadcrumb: "Edit Users",
      }
  },
  {
      path: 'view/:id', component: ModifyUserMasterComponent,
      data: {
          title: "View Users",
          breadcrumb: "View Users",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMasterRoutingModule { }
