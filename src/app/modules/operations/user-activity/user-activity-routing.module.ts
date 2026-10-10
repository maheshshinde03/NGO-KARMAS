import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserActivityComponent } from './user-activity.component';
import { ModifyUserActivityComponent } from './modify-user-activity/modify-user-activity.component';

const routes: Routes = [
  {
      path: '', component: UserActivityComponent,
      data: {
          title: "Users Activity List",
          breadcrumb: "Users Activity List",
      }
  },
  {
      path: 'create', component: ModifyUserActivityComponent,
      data: {
          title: "Create Users Activity",
          breadcrumb: "Create Users Activity",
      }
  },
  {
      path: 'edit/:id', component: ModifyUserActivityComponent,
      data: {
          title: "Edit Users Activity",
          breadcrumb: "Edit Users Activity",
      }
  },
  {
      path: 'view/:id', component: ModifyUserActivityComponent,
      data: {
          title: "View Users Activity",
          breadcrumb: "View Users Activity",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserActivityRoutingModule { }
