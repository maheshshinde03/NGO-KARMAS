import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '@shared/services/toast.service';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { LoaderService } from '@shared/services/loader.service';
import { NgoTypeDetailsData, NgoTypeFormStructure } from '@shared/configs/ngo-type-config';
import { NgoTypeService } from '@shared/_http/ngo-type.service';

@Component({
  selector: 'app-modify-ngo-types',
  standalone: false,
  templateUrl: './modify-ngo-types.component.html',
  styleUrl: './modify-ngo-types.component.scss'
})
export class ModifyNgoTypesComponent implements OnInit, AfterViewInit {
  subs: Subscription = new Subscription();
  routeName: string = '';
  routeId: any;
  ngoTypeFormStructure: IFormStructure[] = [];
  ngoTypeDetailsData: RowData = NgoTypeDetailsData;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngoTypeService: NgoTypeService,
    private toastService: ToastService,
    public loader:LoaderService
  ) {}

  ngOnInit(): void {
    this.ngoTypeFormStructure = JSON.parse(JSON.stringify(NgoTypeFormStructure));
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
    this.ngoTypeFormStructure.forEach(control => {
      if (this.routeName === 'view') {
        control.disable = true;
      }
    });
  }

  /**
   * Fetch NGO field data by ID for edit/view
   */
  getNgoField(): void {
    this.loader.showLoader();
    this.subs.add(
      this.ngoTypeService.getByNgoTypeId(this.routeId).subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.ngoTypeDetailsData.data = res.data;
        },error: () => {
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
          this.ngoTypeService.createNgoType(formData).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'NGO Field created successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/ngo-type');
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
          this.ngoTypeService.updateNgoTypeId(formData, this.routeId).subscribe({
            next: (value) => {
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? 'NGO Field updated successfully';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl('/ngo-type');
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