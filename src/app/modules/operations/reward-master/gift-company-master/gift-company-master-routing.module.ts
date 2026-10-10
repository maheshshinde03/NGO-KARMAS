import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftCompanyMasterComponent } from './gift-company-master.component';
import { ModifyGiftCompanyMasterComponent } from './modify-gift-company-master/modify-gift-company-master.component';

const routes: Routes = [
  {
    path: '', component: GiftCompanyMasterComponent,
    data: {
        title: "Score Board List",
        breadcrumb: "Score Board List",
    }
},
{
    path: 'create', component: ModifyGiftCompanyMasterComponent,
    data: {
        title: "Create Gift Company Master",
        breadcrumb: "Create Gift Company Master",
    }
},
{
    path: 'edit/:id', component: ModifyGiftCompanyMasterComponent,
    data: {
        title: "Edit Gift Company Master",
        breadcrumb: "Edit Gift Company Master",
    }
},
{
    path: 'view/:id', component: ModifyGiftCompanyMasterComponent,
    data: {
        title: "View Gift Company Master",
        breadcrumb: "View Gift Company Master",
    }
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftCompanyMasterRoutingModule { }
