import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketMasterService } from '@shared/_http/ticket-master.service';
import { TicketMasterData } from '@shared/configs/ticket-master-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-master',
  templateUrl: './ticket-master.component.html',
  styleUrl: './ticket-master.component.scss'
})
export class TicketMasterComponent {
  ticketMasterDetailsData: RowData = TicketMasterData;
  subs: any;

  constructor(
    private router: Router,
    private TicketModuleTypeMasterController: TicketMasterService,
    public loader: LoaderService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllTicketModuleType();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllTicketModuleType() {
    this.subs.add(this.TicketModuleTypeMasterController.getAllTicket().subscribe({
      next: (value) => {
        this.ticketMasterDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/ticket-master/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.TicketModuleTypeMasterController.deleteTicket(event).subscribe({
      next: (value) => {
        this.getAllTicketModuleType()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/ticket-master/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/ticket-master/view/${event}`)
  }
}