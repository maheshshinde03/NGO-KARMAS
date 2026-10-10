import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuotesMasterService } from '@shared/_http/quotes-master.service';
import { ReportMasterService } from '@shared/_http/report-master.service';
import { QuotesMasterData } from '@shared/configs/quotes-master-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quotes-master',
  templateUrl: './quotes-master.component.html',
  styleUrl: './quotes-master.component.scss'
})
export class QuotesMasterComponent {
  quotesMasterDetailsData: RowData = QuotesMasterData;
  subs: any;

  constructor(
    private router: Router,
    private quotesMasterController: QuotesMasterService,
    public loader: LoaderService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllReport();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllReport() {
    this.subs.add(this.quotesMasterController.getAllQuotesMaster().subscribe({
      next: (value) => {
        this.quotesMasterDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/quotes-master/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.quotesMasterController.deleteQuotesMaster(event).subscribe({
      next: (value) => {
        this.getAllReport()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/quotes-master/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/quotes-master/view/${event}`)
  }
}

