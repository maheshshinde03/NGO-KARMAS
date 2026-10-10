import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';


@Component({
  selector: 'app-top-ecommerce-chart',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule],
  templateUrl: './top-ecommerce-chart.component.html',
  styleUrl: './top-ecommerce-chart.component.scss'
})
export class TopEcommerceChartComponent {

  @Input() data: any;

}
