import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusMasterService } from '@shared/_http/status.service';
import { StatusDetailsData } from '@shared/configs/status-config';
import { RowData } from '@shared/models/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-status-master',
  templateUrl: './status-master.component.html',
  styleUrl: './status-master.component.scss'
})
export class StatusMasterComponent {
  statusDetailsData: RowData = StatusDetailsData;
  subs: any;

  constructor(private router: Router, private statusMasterController: StatusMasterService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllScroreBoard();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllScroreBoard() {
    this.subs.add(this.statusMasterController.getAllstatus().subscribe({
      next: (value) => {
        this.statusDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/status-master/create")
  }

  handleDeleteAction(event: any) {
    // this.subs.add(this.statusMasterController.deleteScoreBoard(event).subscribe({
    //   next: (value) => {
    //     this.getAllScroreBoard()
    //   }
    // }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/status-master/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/status-master/view/${event}`)
  }
}

