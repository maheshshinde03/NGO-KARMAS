import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThursdayComponent } from './thursday/thursday.component';

@Component({
  selector: 'app-schedule-time',
  standalone: true,
  imports: [CommonModule, ThursdayComponent],
  templateUrl: './schedule-time.component.html',
  styleUrl: './schedule-time.component.scss',
  providers: [DatePipe]
})
export class ScheduleTimeComponent implements OnChanges {

  public openTab: string;
  public isopen: boolean = false;
  @Input() voyageDashboardDetails: any;
  voyageData = []

  constructor(private datePipe: DatePipe) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['voyageDashboardDetails']) {
      const firstValidDetail = this.voyageDashboardDetails.find((detail: any) => detail.data && detail.data.length > 0);
      if (firstValidDetail) {
        this.openTab = firstValidDetail.date;
        this.voyageData = firstValidDetail.data;
      } else {
        this.openTab = this.voyageDashboardDetails[0]?.date
        this.voyageData = this.voyageDashboardDetails[0]?.data
      }
    }

  }

  getDayNumber(date: any): any {
    return this.datePipe.transform(date, 'dd');
  }

  getDayName(date: any): any {
    return this.datePipe.transform(date, 'EEE')?.substring(0, 2);
  }

  open() {
    this.isopen = !this.isopen
  }

  clickOutside(): void {
    this.isopen = false;
  }

  public tabbed(i: any) {
    this.openTab = this.voyageDashboardDetails[i].date
    this.voyageData = this.voyageDashboardDetails[i].data
  }

}
