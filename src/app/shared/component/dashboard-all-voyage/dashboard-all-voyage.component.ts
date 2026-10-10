import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-all-voyage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-all-voyage.component.html',
  styleUrl: './dashboard-all-voyage.component.scss'
})
export class DashboardAllVoyageComponent implements OnChanges {

  @Input() voyageDetails: any
  InvoiceData: any;
  // public InvoiceData = [{ "invoiceId": "#IH63390", "clientName": "Cordelia", "img": "assets/images/avatar/10.jpg", "date": "10-10-2023", "email": "agent1", "project": "website", "Amount": 5411.55, "status": "Arrived", "class": "primary" }, { "invoiceId": "#F749U8", "clientName": "Cordelia", "date": "15-09-2023", "img": "assets/images/avatar/11.jpg", "email": "agent2", "project": "Mobile App", "Amount": 6589.36, "status": "Scheduled", "class": "tertiary" }, { "invoiceId": "#RT5094", "clientName": "Cordelia", "date": "23-05-2023", "img": "assets/images/avatar/1.jpg", "email": "agent3", "project": "Wordpress", "Amount": 9655.16, "status": "Arrived", "class": "primary" }, { "invoiceId": "#PZ7384", "clientName": "Cordelia", "date": "15-02-2023", "img": "assets/images/avatar/3.jpg", "email": "agent4", "project": "Service", "Amount": 5984.62, "status": "Delayed", "class": "danger" }];
  public isopen: boolean = false;

  constructor(private router: Router){}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['voyageDetails']) {
      this.InvoiceData = this.voyageDetails
    }
  }

  handleCreateAction() {
    this.router.navigateByUrl("/port-call/create")
  }

  handleListAction(){
    this.router.navigateByUrl("/port-call")
  }

  open() {
    this.isopen = !this.isopen
  }

  clickOutside(): void {
    this.isopen = false;
  }

}
