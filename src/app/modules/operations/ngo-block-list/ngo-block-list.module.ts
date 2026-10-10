import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NGOBlockListRoutingModule } from './ngo-block-list-routing.module';
import { NGOBlockListComponent } from './ngo-block-list.component';
import { TableComponent } from '@shared/component/table/table.component';
import { NgoControllerService } from '@shared/_http/ngo-master.service';


@NgModule({
  declarations: [NGOBlockListComponent],
  imports: [
    CommonModule,
    TableComponent,
    NGOBlockListRoutingModule
  ],
  providers: [NgoControllerService],
})
export class NGOBlockListModule { }
