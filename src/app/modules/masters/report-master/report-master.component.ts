import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportMasterService } from '@shared/_http/report-master.service';
import { StatusMasterService } from '@shared/_http/status.service';
import { ReportMasterData } from '@shared/configs/report-master-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-master',
  templateUrl: './report-master.component.html',
  styleUrl: './report-master.component.scss'
})
export class ReportMasterComponent {
  reportMasterDetailsData: RowData = ReportMasterData;
  subs: any;

  constructor(
    private router: Router,
    private reportMasterController: ReportMasterService,
    public loader: LoaderService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllReport();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllReport() {
    this.subs.add(this.reportMasterController.getAllReportMaster().subscribe({
      next: (value) => {
        this.reportMasterDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/report-master/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.reportMasterController.deleteReportMaster(event).subscribe({
      next: (value) => {
        this.getAllReport()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/report-master/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/report-master/view/${event}`)
  }
}

