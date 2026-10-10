import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { investment } from '../../../../shared/data/dashboard/default/default-charts';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../shared/directives/outside.directive';
import { NgApexchartsModule } from 'ng-apexcharts';


@Component({
  selector: 'app-manifest-graph',
  standalone: true,
  imports: [CommonModule,ClickOutsideDirective,NgApexchartsModule],
  templateUrl: './manifest-graph.component.html',
  styleUrl: './manifest-graph.component.scss'
})
export class ManifestGraphComponent implements OnInit, AfterViewInit {

  @Input()  public investment :boolean = true;
  @Input() passengerData :any;
  @Input() isPassenger = true;
  @Input() passengerDetails:any;
  public Investmentchart = investment;
  public isopen:boolean = false;

  constructor(public cd:ChangeDetectorRef){

  }
  ngOnInit(): void {
    console.log('passengerDetails = ',this.passengerDetails)
    this.updateChartData();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  open(){
   this.isopen = !this.isopen
  }

  clickOutside():void { 
    this.isopen = false;
  }

  private updateChartData() {


    const colors = [
      "#1F77B4", // Professional blue
      "#FF7F0E", // Warm orange
      "#2CA02C", // Muted green
      "#D62728", // Deep red
      "#9467BD", // Soft purple
      "#8C564B", // Earthy brown
      "#E377C2", // Light pink
      "#7F7F7F"  // Neutral gray
    ];

    if (this.passengerData) {
      this.Investmentchart.series = this.passengerDetails.map((item:any) => parseInt(item.total_length, 10) || 0);
      this.Investmentchart.colors = colors; // Apply colors array to the chart
      this.Investmentchart.tooltip = {
        y: {
            formatter: (val: string, opts: any): string => {
                // Extract the index and use it to find the corresponding `objectName`
                const index = opts.seriesIndex;
                const objectName = this.passengerDetails[index].objectName;
                return `${objectName}: ${val}`;
            },
            labels: {
                show: false,
            },
        },
      };
    }else{
      this.Investmentchart.series = [0,0,0]
    }
  }


}
