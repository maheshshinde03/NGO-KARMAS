import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotesMasterRoutingModule } from './quotes-master-routing.module';
import { QuotesMasterComponent } from './quotes-master.component';
import { ModifyQuotesMasterComponent } from './modify-quotes-master/modify-quotes-master.component';
import { FormComponent } from '@shared/component/form/form.component';
import { TableComponent } from '@shared/component/table/table.component';
import { QuotesMasterService } from '@shared/_http/quotes-master.service';


@NgModule({
  declarations: [QuotesMasterComponent, ModifyQuotesMasterComponent],
  imports: [
    CommonModule,
    FormComponent,
    TableComponent,
    QuotesMasterRoutingModule
  ],
  providers: [QuotesMasterService]
})
export class QuotesMasterModule { }
