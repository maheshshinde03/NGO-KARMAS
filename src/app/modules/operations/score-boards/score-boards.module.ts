import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreBoardsRoutingModule } from './score-boards-routing.module';
import { ScoreBoardsComponent } from './score-boards.component';
import { ModifyScoreBoardsComponent } from './modify-score-boards/modify-score-boards.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { ScoreMasterService } from '@shared/_http/score-setting.service';


@NgModule({
  declarations: [ScoreBoardsComponent,ModifyScoreBoardsComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    ScoreBoardsRoutingModule
  ],
  providers:[ScoreMasterService]
})
export class ScoreBoardsModule { }
