import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserActivityRoutingModule } from './user-activity-routing.module';
import { UserActivityComponent } from './user-activity.component';
import { ModifyUserActivityComponent } from './modify-user-activity/modify-user-activity.component';
import { TableComponent } from '@shared/component/table/table.component';
import { FormComponent } from '@shared/component/form/form.component';
import { UserActivityService } from '@shared/_http/user-activity.service';
import { FeathericonComponent } from '@shared/component/feathericon/feathericon.component';


@NgModule({
  declarations: [UserActivityComponent,ModifyUserActivityComponent],
  imports: [
    CommonModule,
    TableComponent,
    FormComponent,
    FeathericonComponent,
    UserActivityRoutingModule
  ],
  providers: [UserActivityService]
})
export class UserActivityModule { }
