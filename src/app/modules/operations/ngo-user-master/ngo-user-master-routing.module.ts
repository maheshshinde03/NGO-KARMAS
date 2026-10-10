import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgoUserMasterComponent } from './ngo-user-master.component';
import { ModifyNgoUserMasterComponent } from './modify-ngo-user-master/modify-ngo-user-master.component';


const routes: Routes = [
  {
      path: '', component: NgoUserMasterComponent,
      data: {
          title: "Users List",
          breadcrumb: "Users List",
      }
  },
  {
      path: 'create', component: ModifyNgoUserMasterComponent,
      data: {
          title: "Create Users",
          breadcrumb: "Create Users",
      }
  },
  {
      path: 'edit/:id', component: ModifyNgoUserMasterComponent,
      data: {
          title: "Edit Users",
          breadcrumb: "Edit Users",
      }
  },
  {
      path: 'view/:id', component: ModifyNgoUserMasterComponent,
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
export class NgoUserMasterRoutingModule { }
