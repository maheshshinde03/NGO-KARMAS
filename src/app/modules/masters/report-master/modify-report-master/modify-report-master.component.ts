import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { ReportMasterService } from '@shared/_http/report-master.service';
import { ReportPageTypeMasterService } from '@shared/_http/report-page-type-master.service';
import { ReportTypeMasterService } from '@shared/_http/report-type-master.service';
import { UserMasterControllerService } from '@shared/_http/user-master.service';
import { ReportMasterData, ReportMasterFormGroup } from '@shared/configs/report-master-config';
import { ScoreSettingData, scoreSettingFormGroup } from '@shared/configs/score-setting-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { currentUser } from '@shared/utils/current-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-report-master',
  templateUrl: './modify-report-master.component.html',
  styleUrl: './modify-report-master.component.scss'
})
export class ModifyReportMasterComponent implements OnInit, AfterViewInit {

  subs: any;
  routeName: any;
  routeId: any;
  requestSearchGroupStructure!: IFormStructure[];
  reportMasterDetailsData: RowData = ReportMasterData;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private reportPageTypeMasterService: ReportPageTypeMasterService, private reportTypeMasterService: ReportTypeMasterService, private toastService: ToastService, private reportMasterController: ReportMasterService, private userMasterServiceController: UserMasterControllerService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.requestSearchGroupStructure = JSON.parse(JSON.stringify(ReportMasterFormGroup));
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
      this.getRequest()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  initialization(): void {
    this.requestSearchGroupStructure.forEach((ele, index) => {
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
      case "user_list":
        this.subs.add(this.userMasterServiceController.getAllUsers().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
      case "report_page_type":
        this.subs.add(this.reportPageTypeMasterService.getAllReportMaster().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
      case "report_type":
        this.subs.add(this.reportTypeMasterService.getAllReportMaster().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
    }
  }

  getRequest() {
    this.subs.add(this.reportMasterController.getReportMaster(this.routeId).subscribe({
      next: (value) => {
        this.reportMasterDetailsData.data = value.data
      }
    }))
  }

  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]));
    formData.user_id = currentUser().user_id;
    switch (this.routeName) {
      case 'create':
        this.subs.add(this.reportMasterController.createReportMaster(formData).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/report-master")
          },
          error: (err) => {
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;
      case 'edit':
        this.subs.add(this.reportMasterController.updateReportMaster(formData, this.routeId).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/report-master")
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



