import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportPageTypeMasterService } from '@shared/_http/report-page-type-master.service';
import { ReportTypeMasterService } from '@shared/_http/report-type-master.service';
import { ReportMasterData } from '@shared/configs/report-master-config';
import { ReportPageTypeMasterData } from '@shared/configs/report-page-type-master-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-page-type-master',
  standalone: false,
  templateUrl: './report-page-type-master.component.html',
  styleUrl: './report-page-type-master.component.scss'
})
export class ReportPageTypeMasterComponent {
  reportMasterDetailsData: RowData = ReportPageTypeMasterData;
  subs: any;

  constructor(
    private router: Router,
    private reportMasterController: ReportPageTypeMasterService,
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
    this.router.navigateByUrl("/report-page-type-master/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.reportMasterController.deleteReportMaster(event).subscribe({
      next: (value) => {
        this.getAllReport()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/report-page-type-master/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/report-page-type-master/view/${event}`)
  }
}

