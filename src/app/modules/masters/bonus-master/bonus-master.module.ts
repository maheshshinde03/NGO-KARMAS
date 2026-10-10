import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusMasterRoutingModule } from './bonus-master-routing.module';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { BonusMasterComponent } from './bonus-master.component';
import { ModifyBonusMasterComponent } from './modify-bonus-master/modify-bonus-master.component';
import { BonusMasterService } from '@shared/_http/bonus-master.service';
import { ScoreCategoryService } from '@shared/_http/score-category.service';


@NgModule({
  declarations: [BonusMasterComponent,ModifyBonusMasterComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    BonusMasterRoutingModule
  ],
  providers: [BonusMasterService,ScoreCategoryService]
})
export class BonusMasterModule { }
