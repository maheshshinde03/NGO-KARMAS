import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';


@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard-chart.component.html',
  styleUrl: './dashboard-chart.component.scss'
})
export class DashboardChartComponent {

  @Input() data: any;

}
