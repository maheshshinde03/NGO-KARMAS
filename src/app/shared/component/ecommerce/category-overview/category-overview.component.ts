import { Component } from '@angular/core';
import { categoryChart } from '../../../../shared/data/dashboard/ecommerce/ecommerce-chart';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';

@Component({
  selector: 'app-category-overview',
  standalone: true,
  imports: [CommonModule,NgApexchartsModule,ClickOutsideDirective],
  templateUrl: './category-overview.component.html',
  styleUrl: './category-overview.component.scss'
})
export class CategoryOverviewComponent {

  public categoryChart = categoryChart;
  public isopen:boolean = false;

  open(){
   this.isopen = !this.isopen
  }

  clickOutside():void { 
    this.isopen = false;
  }


}
