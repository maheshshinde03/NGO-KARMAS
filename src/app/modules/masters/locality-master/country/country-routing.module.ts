import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './country.component';
import { ModifyCountryComponent } from './modify-country/modify-country.component';

const routes: Routes = [
  {
      path: '', component: CountryComponent,
      data: {
          title: "Country List",
          breadcrumb: "Country List",
      }
  },
  {
      path: 'create', component: ModifyCountryComponent,
      data: {
          title: "Country Create",
          breadcrumb: "Country Create",
      }
  },
  {
      path: 'edit/:id', component: ModifyCountryComponent,
      data: {
          title: "Edit Country",
          breadcrumb: "Edit Country",
      }
  },
  {
      path: 'view/:id', component: ModifyCountryComponent,
      data: {
          title: "View Country",
          breadcrumb: "View Country",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
