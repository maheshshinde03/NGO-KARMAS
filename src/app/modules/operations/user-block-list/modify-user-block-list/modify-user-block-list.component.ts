import { Location } from '@angular/common';
import { AfterViewInit, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '@shared/_http/country.service';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { StateService } from '@shared/_http/state.service';
import { UserService } from '@shared/_http/user_master.service';
import { UserBlockMasterFormGroup, UserMasterData, UserMasterFormGroup } from '@shared/configs/user-master-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-user-block-list',
  templateUrl: './modify-user-block-list.component.html',
  styleUrl: './modify-user-block-list.component.scss'
})
export class ModifyUserBlockListComponent implements OnInit, AfterViewInit {

  subs: any;
  routeName: any;
  routeId: any;
  userBlockSearchGroupStructure!: IFormStructure[];
  requestDetailsData: RowData = UserMasterData;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private toastService: ToastService,
    private userService: UserService,
  ) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.userBlockSearchGroupStructure = JSON.parse(JSON.stringify(UserBlockMasterFormGroup));
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
      this.getCountry()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  initialization(): void {
    this.userBlockSearchGroupStructure.forEach((ele, index) => {
      if (this.routeName == 'view')
        ele.disable = true
      if (ele.type == 'select')
        this.setOptionValues(ele)
    })
  }

  setOptionValues(ele: any) {
    switch (ele.listName) {
      case 'user-id':
        this.subs.add(this.userService.getAllUser().subscribe({
          next: (value) => {
            // const newRes = new EncryptionAPILayer().decryptData(value.resBody); // Decrypt data if necessary
            // const dataValue = newRes.data;
            ele.listData = value.data
          }
        }))
        break;
      case "active_status":
        ele.listData = [{ 'status_id': 0, 'name': 'No' }, { 'status_id': 1, 'name': 'Yes' }]
        break
    }
  }

  getCountry() {
    this.subs.add(this.userService.getUser(this.routeId).subscribe({
      next: (value) => {
        this.requestDetailsData.data = value.data
      }
    }))
  }

  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]));

    this.subs.add(this.userService.createBlockUser(formData).subscribe({
      next: (value) => {
        const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
        this.toastService.open(message, 'success');
        this.router.navigateByUrl("/user-block-list")
      },
      error: (err) => {
        const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
        this.toastService.open(message, 'error');
      }
    }))
  }

}



