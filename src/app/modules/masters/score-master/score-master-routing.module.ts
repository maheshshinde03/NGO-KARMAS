import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreMasterComponent } from './score-master.component';
import { ModifyScoreSettingComponent } from './modify-score-setting/modify-score-setting.component';

const routes: Routes = [
  {
      path: '', component: ScoreMasterComponent,
      data: {
          title: "Score Setting List",
          breadcrumb: "Score Setting List",
      }
  },
  {
      path: 'create', component: ModifyScoreSettingComponent,
      data: {
          title: "Create Score Setting",
          breadcrumb: "Create Score Setting",
      }
  },
  {
      path: 'edit/:id', component: ModifyScoreSettingComponent,
      data: {
          title: "Edit Score Setting",
          breadcrumb: "Edit Score Setting",
      }
  },
  {
      path: 'view/:id', component: ModifyScoreSettingComponent,
      data: {
          title: "View Score Setting",
          breadcrumb: "View Score Setting",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreMasterRoutingModule { }
