import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city.component';
import { ModifyCityComponent } from './modify-city/modify-city.component';

const routes: Routes = [
  { path: '', component: CityComponent, data: { title: 'City List', breadcrumb: 'City List' } },
  { path: 'create', component: ModifyCityComponent, data: { title: 'Create City', breadcrumb: 'Create City' } },
  { path: 'edit/:id', component: ModifyCityComponent, data: { title: 'Edit City', breadcrumb: 'Edit City' } },
  { path: 'view/:id', component: ModifyCityComponent, data: { title: 'View City', breadcrumb: 'View City' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
