import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScoreBoardsComponent } from './score-boards.component';
import { ModifyScoreBoardsComponent } from './modify-score-boards/modify-score-boards.component';


const routes: Routes = [
  {
      path: '', component: ScoreBoardsComponent,
      data: {
          title: "Scoreboard List",
          breadcrumb: "Scoreboard List",
      }
  },
  {
      path: 'create', component: ModifyScoreBoardsComponent,
      data: {
          title: "Create Scoreboard",
          breadcrumb: "Create Scoreboard",
      }
  },
  {
      path: 'edit/:id', component: ModifyScoreBoardsComponent,
      data: {
          title: "Edit Scoreboard",
          breadcrumb: "Edit Scoreboard",
      }
  },
  {
      path: 'view/:id', component: ModifyScoreBoardsComponent,
      data: {
          title: "View Scoreboard",
          breadcrumb: "View Scoreboard",
      }
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScoreBoardsRoutingModule { }
