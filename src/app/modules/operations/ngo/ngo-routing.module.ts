import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgoComponent } from './ngo.component';
import { ModifyNgoComponent } from './modify-ngo/modify-ngo.component';
import { ModifyNgoWithMediaComponent } from './modify-ngo-with-media/modify-ngo-with-media.component';


const routes: Routes = [
  {
      path: '', component: NgoComponent,
      data: {
          title: "NGO List",
          breadcrumb: "NGO List",
      }
  },
  {
      path: 'create', component: ModifyNgoWithMediaComponent,
      data: {
          title: "Create NGO",
          breadcrumb: "Create NGO",
      }
  },
  {
      path: 'edit/:id', component: ModifyNgoWithMediaComponent,
      data: {
          title: "Edit NGO",
          breadcrumb: "Edit NGO",
      }
  },
  {
      path: 'view/:id', component: ModifyNgoWithMediaComponent,
      data: {
          title: "View NGO",
          breadcrumb: "View NGO",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NgoRoutingModule { }
