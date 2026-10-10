import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { ToastService } from '@shared/services/toast.service';
import { NgoFieldDetailsData, NgoFieldFormStructure } from '@shared/configs/ngo-field-config';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { LoaderService } from '@shared/services/loader.service';
import { RequestsTypeService } from '@shared/_http/requestsType.service';

@Component({
  selector: 'app-modify-ngo-field-master',
  templateUrl: './modify-ngo-field-master.component.html',
  styleUrl: './modify-ngo-field-master.component.scss'
})
export class ModifyNgoFieldMasterComponent implements OnInit, AfterViewInit {
  subs: Subscription = new Subscription();
  routeName: string = '';
  routeId: any;
  ngoFieldFormStructure: IFormStructure[] = [];
  ngoFieldDetailsData: RowData = NgoFieldDetailsData;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngoFieldService: NGOFieldService,
    private toastService: ToastService,
    public loader: LoaderService,
    private reuestTypeService:RequestsTypeService
  ) { }

  ngOnInit(): void {
    this.ngoFieldFormStructure = JSON.parse(JSON.stringify(NgoFieldFormStructure));
    this.activatedRoute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getNgoField();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Initialize the form with necessary settings
   */
  initializeForm(): void {
    this.ngoFieldFormStructure.forEach(control => {
      if (this.routeName === 'view') {
        control.disable = true;
      }
      if (control.type == 'select')
        this.setOptionValues(control)
    });
  }


  setOptionValues(ele: any) {
    switch (ele.listName) {
      case "requestTypeList":
        this.subs.add(this.reuestTypeService.getAllrequests().subscribe({
          next: (value) => {
            ele.listData = value.data
          }
        }))
        break
    }
  }


  /**
   * Fetch NGO field data by ID for edit/view
   */
  getNgoField(): void {
    this.loader.showLoader();
    this.subs.add(
      this.ngoFieldService.getByNgoFieldId(this.routeId).subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.ngoFieldDetailsData.data = res.data;
        }, error: () => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Handle form submission for create and edit
   * @param event emitted data from app-form
   */
  handleSubmit(event: any): void {
    const formData = { ...event.formValue };

    switch (this.routeName) {
      case 'create':
        this.subs.add(
          this.ngoFieldService.createNGOField(formData).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'NGO Field created successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/ngo-field');
            },
            error: (err) => {
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;

      case 'edit':
        this.subs.add(
          this.ngoFieldService.updateNGOField(formData, this.routeId).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'NGO Field updated successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/ngo-field');
            },
            error: (err) => {
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;
    }
  }
}