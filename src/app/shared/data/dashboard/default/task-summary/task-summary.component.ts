import { Component, Input } from '@angular/core';
import { TaskSummary, TaskSummaryNGO  } from '@shared/data/dashboard/default/default';
import { TaskSummaryChart } from '@shared/data/dashboard/default/default-charts';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ClickOutsideDirective } from '@shared/directives/outside.directive';

@Component({
  selector: 'app-task-summary',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule,ClickOutsideDirective],
  templateUrl: './task-summary.component.html',
  styleUrl: './task-summary.component.scss'
})
export class TaskSummaryComponent {
  @Input() taskSummaryNGOResponse:any;
  public TaskSummaryData = TaskSummaryNGO;
  public TaskSummaryChartData = TaskSummaryChart;
  public isopen:boolean = false;

  open(){
   this.isopen = !this.isopen
  }

  clickOutside():void { 
    this.isopen = false;
  }


}
