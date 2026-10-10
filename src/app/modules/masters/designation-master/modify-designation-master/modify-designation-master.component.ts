import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DesignationMasterService } from '@shared/_http/designation-master.service';
import { ToastService } from '@shared/services/toast.service';
import { DesignationDetailsData, DesignationFormStructure } from '@shared/configs/designation-master-config';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { TableMasterService } from '@shared/_http/table-master.service';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-modify-designation-master',
  templateUrl: './modify-designation-master.component.html',
  styleUrl: './modify-designation-master.component.scss'
})
export class ModifyDesignationMasterComponent  implements OnInit, AfterViewInit {
  subs: Subscription = new Subscription();
  routeName: string = ''; // create, edit, view
  routeId: any; // designation_id
  designationFormStructure: IFormStructure[] = [];
  designationDetailsData: RowData = DesignationDetailsData;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private designationService: DesignationMasterService,
    private toastService: ToastService,
    private tableMasterService:TableMasterService,
    public loader:LoaderService
  ) {}

  ngOnInit(): void {
    this.designationFormStructure = JSON.parse(JSON.stringify(DesignationFormStructure)); // Deep clone to avoid mutations

    this.activatedRoute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path; // get current action type
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id'); // get ID if present
    });

    this.initializeForm(); // set disable if view, prepare options
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getDesignation(); // fetch data if in edit or view
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Initialize form settings, disabling fields in view mode
   */
  initializeForm(): void {
    this.designationFormStructure.forEach(control => {
      if (this.routeName === 'view') {
        control.disable = true;
      }
      if (control.type === 'select') {
        this.setOptionValues(control);
      }
    });
  }

  /**
   * Set dropdown options dynamically
   * @param control form control
   */
  setOptionValues(control: IFormStructure): void {
    if (control.listName === 'table') {
      this.subs.add(
        this.tableMasterService.getAllTable().subscribe({
          next: (res) => {
            control.listData = res.data;
          }
        })
      );
    }
  }

  /**
   * Fetch a single designation's data for edit/view
   */
  getDesignation(): void {
    this.loader.showLoader();
    this.subs.add(
      this.designationService.getDesignationById(this.routeId).subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.designationDetailsData.data = res.data;
        },error:()=>{
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
          this.designationService.createDesignation(formData).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'Designation created successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/designation-master');
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
          this.designationService.updateDesignation(formData, this.routeId).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'Designation updated successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/designation-master');
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
