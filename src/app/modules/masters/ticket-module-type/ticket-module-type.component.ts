import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TicketModuleTypeMasterService } from '@shared/_http/ticket-module-type.service';
import { ScoreSettingData } from '@shared/configs/score-setting-config';
import { ticketModuleTypeData } from '@shared/configs/ticket-module-type-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-module-type',
  templateUrl: './ticket-module-type.component.html',
  styleUrl: './ticket-module-type.component.scss'
})
export class TicketModuleTypeComponent {
  ticketModuleTypeDetailsData: RowData = ticketModuleTypeData;
  subs: any;

  constructor(
    private router: Router,
    private TicketModuleTypeMasterController: TicketModuleTypeMasterService,
    public loader: LoaderService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllTicketModuleType();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllTicketModuleType() {
    this.subs.add(this.TicketModuleTypeMasterController.getAllTicketModuleType().subscribe({
      next: (value) => {
        this.ticketModuleTypeDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/ticket-module-type-master/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.TicketModuleTypeMasterController.deleteTicketModuleType(event).subscribe({
      next: (value) => {
        this.getAllTicketModuleType()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/ticket-module-type-master/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/ticket-module-type-master/view/${event}`)
  }
}