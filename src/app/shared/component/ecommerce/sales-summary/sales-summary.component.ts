import { Component } from '@angular/core';
import { SalesSummary1, SalesSummary2 } from '../../../../shared/data/dashboard/ecommerce/ecommerce-chart';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-sales-summary',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, ClickOutsideDirective],
  templateUrl: './sales-summary.component.html',
  styleUrl: './sales-summary.component.scss'
})
export class SalesSummaryComponent {

  public SalesSummary1 = SalesSummary1;
  public SalesSummary2 = SalesSummary2;
  public isopen: boolean = false;

  open() {
    this.isopen = !this.isopen
  }

  clickOutside(): void {
    this.isopen = false;
  }

}
