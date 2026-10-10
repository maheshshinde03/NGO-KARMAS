import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RequestDocumentsMasterService } from '@shared/_http/request-documents-master.service';
import { RequestDocumentMasterData } from '@shared/configs/request-documents-master-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-request-documents',
  templateUrl: './request-documents.component.html',
  styleUrl: './request-documents.component.scss'
})
export class RequestDocumentsComponent {
  requestDocumentsMasterDetailsData: RowData = RequestDocumentMasterData;
  subs: any;

  constructor(
    private router: Router,
    private requestDocMasterController: RequestDocumentsMasterService,
    public loader: LoaderService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllRquestDocs();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllRquestDocs() {
    this.subs.add(this.requestDocMasterController.getAllRequestDocumentsMaster().subscribe({
      next: (value) => {
        this.requestDocumentsMasterDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/request-docs-master/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.requestDocMasterController.deleteRequestDocumentsMaster(event).subscribe({
      next: (value) => {
        this.getAllRquestDocs()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/request-docs-master/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/request-docs-master/view/${event}`)
  }
}

