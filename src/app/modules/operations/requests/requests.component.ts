import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { RequestsService } from '@shared/_http/requests.service';
import { RequestsDetailsData, requestStatusCard } from '@shared/configs/requests-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrl: './requests.component.scss'
})
export class RequestsComponent {
  requestDetailsData: RowData = RequestsDetailsData;
  subs: any;
  requestStatusCard: any[] = requestStatusCard;
  constructor(private router: Router, private cityservice: CityService, private requestsService: RequestsService, private loader: LoaderService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllRequest();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllRequest() {
    this.loader.showLoader();
    this.subs.add(this.requestsService.getAllrequests().subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.requestDetailsData.data = value.data;
      }, error: (er) => {
        this.loader.hideLoader();
      }
    }));
    this.subs.add(
      this.requestsService
        .getNgoRequestDashboardDataGetRequestCount(null)
        .subscribe({
          next: (value) => {
            const data = value?.data || {};

            // Update card numbers dynamically based on key
            this.requestStatusCard = this.requestStatusCard.map(card => ({
              ...card,
              number: Number(data[card.key] ?? 0)
            }));

            this.loader.hideLoader();
          },
          error: () => {
            this.loader.hideLoader();
          }
        })
    );
  }


  handleCreateAction() {
    this.router.navigateByUrl("/requests/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.requestsService.deleterequests(event).subscribe({
      next: (value) => {
        this.getAllRequest()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/requests/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/requests/view/${event}`)
  }

  // Card click handling
  handleCardClickAction(event: any) {
    // this.shipmentsDetailsData.data = this.filterShipmentData.filter(data => data.hawb_state_name == event.name)
    // console.log('event = ',event);
    // if(event.key === 'total_invoices'){
    //   this.loadAllInvoiceForCustAndAdmin(null);
    // }
    // if(event.key === 'total_approved'){
    //   this.loadAllInvoiceForCustAndAdmin(1);
    // }
    // if(event.key === 'total_not_approved'){
    //   this.loadAllInvoiceForCustAndAdmin(0);
    // }
  }
}
