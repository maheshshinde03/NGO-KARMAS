import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { TicketModuleTypeMasterService } from '@shared/_http/ticket-module-type.service';
import { ticketModuleTypeData, ticketModuleTypeFormGroup } from '@shared/configs/ticket-module-type-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-ticket-module-type',
  templateUrl: './modify-ticket-module-type.component.html',
  styleUrl: './modify-ticket-module-type.component.scss'
})
export class ModifyTicketModuleTypeComponent implements OnInit, AfterViewInit {

  subs: any;
  routeName: any;
  routeId: any;
  ticketModuleTypeGroupStructure!: IFormStructure[];
  ticketModuleTypeDetailsData: RowData = ticketModuleTypeData;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private cityservice: CityService, private toastService: ToastService, private ticketModuleTypeMasterService: TicketModuleTypeMasterService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.ticketModuleTypeGroupStructure = JSON.parse(JSON.stringify(ticketModuleTypeFormGroup));
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
      this.getTicketModuleType()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  initialization(): void {
    this.ticketModuleTypeGroupStructure.forEach((ele, index) => {
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
      // case "country":
      //   this.subs.add(this.countryservice.getAllCountry().subscribe({
      //     next: (value) => {
      //       ele.listData = value.data
      //     }
      //   }))
      //  break
      // case "state":
      //   this.subs.add(this.stateservice.getAllState().subscribe({
      //     next: (value) => {
      //       ele.listData = value.data
      //     }
      //   }))
      //   break
    }
  }

  getTicketModuleType() {
    this.subs.add(this.ticketModuleTypeMasterService.getTicketModuleType(this.routeId).subscribe({
      next: (value) => {
        this.ticketModuleTypeDetailsData.data = value.data
      }
    }))
  }

  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]));
    formData.role_id = '1',
      formData.ngo_id = null
    switch (this.routeName) {
      case 'create':
        this.subs.add(this.ticketModuleTypeMasterService.createTicketModuleType(formData).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/user-master")
          },
          error: (err) => {
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;
      case 'edit':
        this.subs.add(this.ticketModuleTypeMasterService.updateTicketModuleType(formData, this.routeId).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/user-master")
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



