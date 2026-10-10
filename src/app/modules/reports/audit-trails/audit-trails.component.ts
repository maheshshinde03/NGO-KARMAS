import { Component } from '@angular/core';
import { AuditTrailService } from '@shared/_http/audit-trail.service';
import { AuditTrailDetailsData, AuditTrailFormStructure } from '@shared/configs/audit-trail-config';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ExcelService } from '@shared/services/excel-export.service';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audit-trails',
  templateUrl: './audit-trails.component.html',
  styleUrl: './audit-trails.component.scss'
})
export class AuditTrailsComponent {

  subs: any;
  AuditTrailFormStructureStructure!: IFormStructure[];
  AuditTrailDetailsData: RowData = AuditTrailDetailsData;
  selectedSchema: any;

  constructor(private audittrailservice: AuditTrailService, private toastService: ToastService,private excelservice: ExcelService) { }

  ngOnInit(): void {
    this.subs = new Subscription()
    this.AuditTrailFormStructureStructure = JSON.parse(JSON.stringify(AuditTrailFormStructure));
    this.initialization()
  }

  initialization(): void {
    this.AuditTrailFormStructureStructure.forEach((ele, index) => {
      if (ele.type == 'select')
        this.setOptionValues(ele)
    })
  }

  setOptionValues(ele: any) {
    switch (ele.listName) {
      case "schema":
        this.subs.add(this.audittrailservice.getAllSchema().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
    }
  }

  selectValueChangeChange(event: any) {
    if ('schema_id' in event) {
      this.selectedSchema = event;
      this.getAuditTrailLimit(event.schema_id)
    }
  }

  getAuditTrailLimit(id: any) {
    this.subs.add(this.audittrailservice.getAuditTrailLimit(id).subscribe({
      next: (value) => {
        this.AuditTrailDetailsData.data = value.data
      }
    }))
  }

  handleExportAction() {
    if (this.selectedSchema.schema_id) {
      this.subs.add(this.audittrailservice.getAuditTrail(this.selectedSchema.schema_id).subscribe({
        next: (value) => {
          this.excelservice.exportAsExcelFile(value.data, this.selectedSchema.display_name, this.AuditTrailDetailsData.excelKeys);
        }
      }))
    }
    else
      this.toastService.open('Select Module First', 'error');
  }

}
