import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NGOBlockListComponent } from './ngo-block-list.component';

const routes: Routes = [
  {
    path: '', component: NGOBlockListComponent,
    data: {
        title: "NGO Block List",
        breadcrumb: "NGO Block List",
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NGOBlockListRoutingModule { }
