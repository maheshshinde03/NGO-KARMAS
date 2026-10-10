import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { InvoiceIrnProgressComponent } from '../invoice-irn-progress/invoice-irn-progress.component';

@Component({
  selector: 'app-total-invoice',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule,InvoiceIrnProgressComponent],
  templateUrl: './total-invoice.component.html',
  styleUrl: './total-invoice.component.scss'
})
export class TotalInvoiceComponent {

  @Input() data: any;
  @Input() invoiceDashboard: any;
  
  isSeriesAllZeros(series: number[]): boolean {
    return series.every(value => value == 0);
  }
}
