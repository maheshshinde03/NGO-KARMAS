import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FeathericonComponent } from '../feathericon/feathericon.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RowData } from '@shared/models/table';
import { PipeModule } from '@shared/pipe/pipe.module';
import { DatePipe } from '@angular/common';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { NoRecordFoundComponent } from '../no-record-found/no-record-found.component';
import { ToastService } from '@shared/services/toast.service';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { ItemDetailDialogComponent } from '../item-detail-dialog/item-detail-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { PermissionsService } from '@shared/services/PermissionsService';
import { PermissionsActions } from '@shared/constants/permissionsActions.constant';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  standalone: true,
  providers: [DatePipe],
  imports: [TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, DropdownModule, HttpClientModule, CommonModule, FeathericonComponent, RouterModule, NgbModule, NoRecordFoundComponent, PipeModule, MatDialogModule, MatButtonModule, ItemDetailDialogComponent]
})
export class TableComponent implements OnInit {

  statuses!: any[];
  selectedRows: any;
  loading: boolean = true;
  openmenu: any;
  emitId: any = null;
  canCreate: boolean = false;
  canEdit: boolean = false;
  canView: boolean = false;
  canDelete: boolean = false;
  canUnlock: boolean = false;
  canLock: boolean = false;
  canApprove: boolean = false;
  canReject: boolean = false;
  canRollback: boolean = false;
  deleteWithFullRow:any = null;
  pageId: number | null = null; // Nullable to handle cases where pageId is not set
  @Input() actiontype: any = 'create';
  @Input() jsonData!: RowData;
  @Output() handleCreateAction = new EventEmitter<void>();
  @Output() handleEditAction = new EventEmitter<void>();
  @Output() handleViewAction = new EventEmitter<void>();
  @Output() handleDeleteAction = new EventEmitter<void>();
  @Output() handleDeleteActionWithData = new EventEmitter<void>();
  @Output() handleUploadAction = new EventEmitter<void>();
  @Output() handleTrackAction = new EventEmitter<void>();
  @Output() handleCommentsAction = new EventEmitter<void>();
  @Output() handleEnterAction = new EventEmitter<void>();
  @Output() handleExportAction = new EventEmitter<void>();
  @Output() handleSelectRowAction = new EventEmitter<void>();
  @Output() handleCreateSecondAction = new EventEmitter<void>();
  @Output() handleCreateThirdAction = new EventEmitter<void>();
  @Output() handleCheckAction = new EventEmitter<void>();
  @Output() handleCheckActionFullData = new EventEmitter<void>();
  @Output() handleSendAction = new EventEmitter<void>();
  @Output() handleCorssAction = new EventEmitter<void>();
  @Output() handleCorssActionFullData = new EventEmitter<void>();

  @Output() handleRollbackAction = new EventEmitter<void>();
  @Output() handleUnlockAction = new EventEmitter<void>();
  @Output() handlelockAction = new EventEmitter<void>();
  @Output() handleCheckBoxAction = new EventEmitter<void>();
  @Output() handleAssignAction = new EventEmitter<void>();
  @Output() handleEditFullDataAction = new EventEmitter<void>();
  @Output() handleRequestFileAction = new EventEmitter<void>();

  

  @ViewChild('DeleteConfirmation', { static: true }) DeleteConfirmation!: TemplateRef<NgbModal>;
  constructor(private modalService: NgbModal, private toastService: ToastService, public dialog: MatDialog, private permissionsService: PermissionsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.pageId = data['pageId']; // Retrieve pageId from route data

      if (this.pageId) {
        // Check permissions based on the retrieved pageId
        this.canCreate = this.permissionsService.hasPermission(this.pageId, PermissionsActions.CREATE.name);
        this.canEdit = this.permissionsService.hasPermission(this.pageId, PermissionsActions.EDIT.name);
        this.canView = this.permissionsService.hasPermission(this.pageId, PermissionsActions.VIEW.name);
        this.canDelete = this.permissionsService.hasPermission(this.pageId, PermissionsActions.DELETE.name);
        this.canLock = this.permissionsService.hasPermission(this.pageId, PermissionsActions.LOCK.name);
        this.canUnlock = this.permissionsService.hasPermission(this.pageId, PermissionsActions.UNLOCK.name);

        this.canApprove = this.permissionsService.hasPermission(this.pageId, PermissionsActions.APPROVE.name);
        this.canReject = this.permissionsService.hasPermission(this.pageId, PermissionsActions.REJECT.name);
        this.canRollback = this.permissionsService.hasPermission(this.pageId, PermissionsActions.ROLLBACK.name);
      }
    })
    this.loading = false;

    this.statuses = this.jsonData.statuses
  }

  clear(table: Table) {
    table.clear();
  }

  getSeverity(status: string) {
    if (!status) {
      return 'secondary'; // ✅ instead of 'black'
    }
    const state = this.statuses.find((item: any) => item.label === status.toString())?.value ?? '';
    switch (state) {
      case 'danger':
        return 'danger';

      case 'Approved':
        return 'success';

      case 'Request Completed':
        return 'success';

      case 'Rejected':
        return 'danger';

      case 'Request Inisited':
        return 'info';

      case 'success':
        return 'success';

      case 'info':
        return 'info';

      case 'warning':
        return 'warning';

      default:
        return undefined;
    }
  }

  calculateHeaderSize(headerCount: any, colSize: any) {
    if (colSize && colSize.length > 0) {
      return colSize;
    }
    else {
      const count = Number(headerCount) - 2
      const calculatePercentage = 85 / Number(count);
      return calculatePercentage + '%'
    }
  }

  buttonClick(action: any, id: any = '', event: any = {}, operationId?: any, data?: any) {
    switch (action) {
      case 'create':
        this.handleCreateAction.emit();
        break;
      case 'createsecond':
        this.handleCreateSecondAction.emit();
        break;
      case 'createthird':
        this.handleCreateThirdAction.emit();
        break;
      case 'edit':
        console.log('id = ', id)
        this.handleEditAction.emit(id);
        break;
      case 'view':
        this.handleViewAction.emit(id);
        break;
      case 'upload':
        this.handleUploadAction.emit(id);
        break;
      case 'delete':
        // this.centeredModal(operationId)
        this.emitId = id;
        // this.handleDeleteAction.emit(id);
        break;
      case 'track':
        this.handleTrackAction.emit(id);
        break;
      case 'comments':
        this.handleCommentsAction.emit(id);
        break;
      case 'enter':
        this.handleEnterAction.emit(id);
        break;
      case 'export':
        this.handleExportAction.emit();
        break;
      case 'selectrow':
        if ((event.target as HTMLElement).closest('.action-button')) {
        } else {
          this.handleSelectRowAction.emit(id);
        }
        break;
      case 'check':
        this.handleCheckAction.emit(id);
        this.handleCheckActionFullData.emit(data)
        break;
      case 'cross':
        this.handleCorssAction.emit(id);
        this.handleCorssActionFullData.emit(data);
        break;
      case 'rollback':
        this.handleRollbackAction.emit(id);
        break;
      case 'send':
        this.handleSendAction.emit(id);
        break;
      case 'lock':
        this.handlelockAction.emit(id);
        break;
      case 'unlock':
        this.handleUnlockAction.emit(id);
        break;
      case 'checkboxselect':
        this.handleCheckBoxAction.emit(this.selectedRows);
        break;
      case 'requestFile':
        this.handleRequestFileAction.emit(data);
        break;
    }
  }

  buttonClickDataFull(action: any, data: any, index?: any) {
    switch (action) {
      case 'assign':
        this.handleAssignAction.emit(data);
        break;
      case 'editFullData':
        this.handleEditFullDataAction.emit(data);
        break;
      case 'deleteWithFullData':
        data.index = index;
        // this.handleDeleteActionWithData.emit(data);
        this.deleteWithFullRow = data;
        this.centeredModal2();
        break;

    }
  }

  openMenu(index: any) {
    if (index == this.openmenu)
      this.openmenu = null;
    else
      this.openmenu = index;
  }

  getObjectsDiff(newObject: any, originalObject: any): any {
    const objectsDiff = (newObject: any, originalObject: any): any => {
      return _.transform(newObject, (result: any, value: any, key: string) => {
        if (!_.isEqual(value, originalObject[key])) {
          result[key] = (_.isObject(value) && _.isObject(originalObject[key])) ? objectsDiff(value, originalObject[key]) : value;
        }
      });
    }
    return objectsDiff(newObject, originalObject);
  }

  centeredModal(operationId: any) {
    if (operationId) {
      const message = 'This field cannot be deleted because a job ID is present.';
      this.toastService.open(message, 'error');
      return
    } else {
      const modalRef = this.modalService.open(this.DeleteConfirmation, { centered: true, backdrop: 'static' });
    }
  }

  centeredModal2() {
    const modalRef = this.modalService.open(this.DeleteConfirmation, { centered: true, backdrop: 'static' });
  }

  confirmDelete() {
    if (this.emitId) {
      this.handleDeleteAction.emit(this.emitId);
    }

    if(this.deleteWithFullRow){
      this.handleDeleteActionWithData.emit(this.deleteWithFullRow);
    }
    this.emitId = null;
    this.deleteWithFullRow = null;
    this.modalService.dismissAll();
  }

  isValidDataKey(key: any): key is string {
    return typeof key === 'string';
  }

  openDetailDialog(item: any): void {
    let imgData: any;
    let base64String = item || '';
    let mimeType: string = 'application/octet-stream'; // Default MIME type for unknown data
    let imageFilePath;

    if (base64String.startsWith('http://') || base64String.startsWith('https://')) {
      // mimeType = 'text/html'; // MIME type for URLs
      imageFilePath = base64String
    }

    // Detect the type of base64 data based on its prefix or content
    if (base64String && !imageFilePath) {
      if (base64String.startsWith('/9j/') || base64String.startsWith('iVBORw0KGgo')) {
        // Assuming this is an image (JPEG or PNG)
        mimeType = 'image/jpeg'; // Default MIME type for JPEG images
        if (base64String.startsWith('iVBORw0KGgo')) {
          mimeType = 'image/png'; // For PNG images
        }
      } else if (base64String.startsWith('JVBERi0')) {
        // Detect PDF based on its header
        mimeType = 'application/pdf';
      } else if (base64String.startsWith('data:')) {
        // Already in the correct format
        mimeType = base64String.split(';')[0].split(':')[1];
      }

      // If the base64String does not already include the MIME type
      if (!base64String.startsWith('data:')) {
        base64String = `data:${mimeType};base64,${base64String}`;
      }
    }

    // Prepare the imgData object based on the type of content
    imgData = {
      key: mimeType === 'application/pdf' ? 'Document' : 'Job Id',
      value: mimeType === 'application/pdf' ? item?.document_no : item?.job_no,
      img: imageFilePath ? imageFilePath : base64String,
      img_name: item?.image_file_name,
    };

    // Configure dialog settings
    const dialogConfig: MatDialogConfig = {
      maxWidth: '80vw',
      maxHeight: '90vh',
      height: '100%',
      width: '100%',
      data: imgData,
      autoFocus: true,
      disableClose: true,
      panelClass: 'custom-dialog-container', // Use a custom class for additional styling
    };
    const dialogRef = this.dialog.open(ItemDetailDialogComponent, dialogConfig);

  }

  numberFormat(data: number): string {
    const numberString = data.toString().replace('.00', '');
    if (numberString.length <= 3)
      return numberString
    const lastThreeDigits = numberString.slice(-3);
    const otherDigits = numberString.slice(0, -3);
    const formattedOtherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return formattedOtherDigits + ',' + lastThreeDigits;
  }

  isAssignDisabled(data: any): boolean {
    // Highest priority: global / row assign lock
    if (this.jsonData?.isassignKeyUnable === true) {
      return true;
    }

    // 🟡 Normal conditions
    return (
      this.actiontype === 'view' ||
      !!data?.[this.jsonData?.dataKey]
    );
  }
}