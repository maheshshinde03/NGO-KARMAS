import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftRewardComponent } from './gift-reward.component';
import { ModifyGiftRewardComponent } from './modify-gift-reward/modify-gift-reward.component';

const routes: Routes = [
  {
      path: '', component: GiftRewardComponent,
      data: {
          title: "Gift And Reward List",
          breadcrumb: "Gift And Reward List",
      }
  },
  {
      path: 'create', component: ModifyGiftRewardComponent,
      data: {
          title: "Create Gift And Reward",
          breadcrumb: "Create Gift And Reward",
      }
  },
  {
      path: 'edit/:id', component: ModifyGiftRewardComponent,
      data: {
          title: "Edit Gift And Reward",
          breadcrumb: "Edit Gift And Reward",
      }
  },
  {
      path: 'view/:id', component: ModifyGiftRewardComponent,
      data: {
          title: "View Gift And Reward",
          breadcrumb: "View Gift And Reward",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GiftRewardRoutingModule { }
