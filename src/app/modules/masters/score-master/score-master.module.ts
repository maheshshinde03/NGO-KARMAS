import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScoreMasterRoutingModule } from './score-master-routing.module';
import { ScoreMasterComponent } from './score-master.component';
import { ModifyScoreSettingComponent } from './modify-score-setting/modify-score-setting.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { ScoreMasterService } from '@shared/_http/score-setting.service';


@NgModule({
  declarations: [ScoreMasterComponent,ModifyScoreSettingComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    ScoreMasterRoutingModule
  ],
  providers: [ScoreMasterService],
})
export class ScoreMasterModule { }
