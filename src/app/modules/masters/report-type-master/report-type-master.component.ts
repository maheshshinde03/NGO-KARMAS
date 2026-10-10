import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportMasterService } from '@shared/_http/report-master.service';
import { ReportTypeMasterService } from '@shared/_http/report-type-master.service';
import { ReportMasterData } from '@shared/configs/report-master-config';
import { ReportTypeMasterData } from '@shared/configs/report-type-master-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-report-type-master',
  standalone: false,
  templateUrl: './report-type-master.component.html',
  styleUrl: './report-type-master.component.scss'
})
export class ReportTypeMasterComponent {
  reportMasterDetailsData: RowData = ReportTypeMasterData;
  subs: any;

  constructor(
    private router: Router,
    private reportMasterController: ReportTypeMasterService,
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
    this.router.navigateByUrl("/report-type-master/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.reportMasterController.deleteReportMaster(event).subscribe({
      next: (value) => {
        this.getAllReport()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/report-type-master/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/report-type-master/view/${event}`)
  }
}

