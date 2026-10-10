import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesMasterComponent } from './quotes-master.component';
import { ModifyQuotesMasterComponent } from './modify-quotes-master/modify-quotes-master.component';

const routes: Routes = [
  {
      path: '', component: QuotesMasterComponent,
      data: {
          title: "Quotes List",
          breadcrumb: "Quotes List",
      }
  },
  {
      path: 'create', component: ModifyQuotesMasterComponent,
      data: {
          title: "Create Quotes",
          breadcrumb: "Create Quotes",
      }
  },
  {
      path: 'edit/:id', component: ModifyQuotesMasterComponent,
      data: {
          title: "Edit Quotes",
          breadcrumb: "Edit Quotes",
      }
  },
  {
      path: 'view/:id', component: ModifyQuotesMasterComponent,
      data: {
          title: "View Quotes",
          breadcrumb: "View Quotes",
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotesMasterRoutingModule { }
