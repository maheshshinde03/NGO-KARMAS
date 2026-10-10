import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { RequestDocumentsMasterService } from '@shared/_http/request-documents-master.service';
import { RequestDocumentMasterData, RequestDocumentMasterFormGroup } from '@shared/configs/request-documents-master-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-request-documents',
  templateUrl: './modify-request-documents.component.html',
  styleUrl: './modify-request-documents.component.scss'
})
export class ModifyRequestDocumentsComponent implements OnInit, AfterViewInit {

  subs: any;
  routeName: any;
  routeId: any;
  requestDocsSearchGroupStructure!: IFormStructure[];
  requestDocsMasterDetailsData: RowData = RequestDocumentMasterData;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private cityservice: CityService, private toastService: ToastService, private requestDocMasterController: RequestDocumentsMasterService,) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.requestDocsSearchGroupStructure = JSON.parse(JSON.stringify(RequestDocumentMasterFormGroup));
    this.activatedroute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });
    this.activatedroute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });
    this.initialization()
  }

  ngAfterViewInit(): void {
    if (this.routeId)
      this.getRequestDocuments()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  initialization(): void {
    this.requestDocsSearchGroupStructure.forEach((ele, index) => {
      if (this.routeName == 'view')
        ele.disable = true
      if (ele.type == 'select')
        this.setOptionValues(ele)
    })
  }

  setOptionValues(ele: any) {
    switch (ele.listName) {
      case "active_status":
        ele.listData = [{ 'status_id': 0, 'name': 'No' }, { 'status_id': 1, 'name': 'Yes' }]
        break
      case "gender":
        ele.listData = [{ 'value': 0, 'gender': 'Male' }, { 'value': 1, 'gender': 'Female' }]
        break
    }
  }

  getRequestDocuments() {
    this.subs.add(this.requestDocMasterController.getRequestDocumentsMaster(this.routeId).subscribe({
      next: (value) => {
        this.requestDocsMasterDetailsData.data = value.data
      }
    }))
  }

  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]));
    switch (this.routeName) {
      case 'create':
        this.subs.add(this.requestDocMasterController.createRequestDocumentsMaster(formData).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/request-docs-master")
          },
          error: (err) => {
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;
      case 'edit':
        this.subs.add(this.requestDocMasterController.updateRequestDocumentsMaster(formData, this.routeId).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/request-docs-master")
          },
          error: (err) => {
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;

    }
  }

}



