import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { QuotesMasterService } from '@shared/_http/quotes-master.service';
import { QuotesMasterData, QuotesMasterFormGroup } from '@shared/configs/quotes-master-config';
import { ReportMasterData, ReportMasterFormGroup } from '@shared/configs/report-master-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-quotes-master',
  templateUrl: './modify-quotes-master.component.html',
  styleUrl: './modify-quotes-master.component.scss'
})
export class ModifyQuotesMasterComponent implements OnInit, AfterViewInit {

  subs: any;
  routeName: any;
  routeId: any;
  quotesSearchGroupStructure!: IFormStructure[];
  quotesMasterDetailsData: RowData = QuotesMasterData;

  constructor(private router: Router, private activatedroute: ActivatedRoute, private quotesMasterService: QuotesMasterService, private toastService: ToastService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.quotesSearchGroupStructure = JSON.parse(JSON.stringify(QuotesMasterFormGroup));
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
    this.quotesSearchGroupStructure.forEach((ele, index) => {
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

  getRequest() {
    this.subs.add(this.quotesMasterService.getQuotesMaster(this.routeId).subscribe({
      next: (value) => {
        this.quotesMasterDetailsData.data = value.data
      }
    }))
  }

  handleSubmit(event: any) {
    let formData = JSON.parse(JSON.stringify(event["formValue"]));
    switch (this.routeName) {
      case 'create':
        this.subs.add(this.quotesMasterService.createQuotesMaster(formData).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/quotes-master")
          },
          error: (err) => {
            const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went to wrong!';
            this.toastService.open(message, 'error');
          }
        }))
        break;
      case 'edit':
        this.subs.add(this.quotesMasterService.updateQuotesMaster(formData, this.routeId).subscribe({
          next: (value) => {
            const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl("/quotes-master")
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



