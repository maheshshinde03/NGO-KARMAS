import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistrictService } from '@shared/_http/district.service'; // District Service for API calls
import { StateService } from '@shared/_http/state.service';
import { DistrictDetails, DistrictSearchGroup } from '@shared/configs/district.config';
import { ACTIVE_INACTIVE_LISTDATA } from '@shared/configs/yesNoSelect-config'; // Yes/No Select Config
import { responseMessages } from '@shared/constants/response-msgs.constant'; // Response Messages for errors
import { IFormStructure } from '@shared/models/form'; // Form Model
import { RowData } from '@shared/models/table'; // Row Data Model
import { LoaderService } from '@shared/services/loader.service'; // Loader Service for loading states
import { ToastService } from '@shared/services/toast.service'; // Toast Service for user messages
import { Subscription } from 'rxjs'; // Subscription for managing observable subscriptions

@Component({
  selector: 'app-modify-district',
  templateUrl: './modify-district.component.html',
  styleUrl: './modify-district.component.scss'
})
export class ModifyDistrictComponent  implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  routeName: string | undefined; // To hold the route name (view, edit, create)
  routeId: string | null = null; // To hold the district ID for editing/viewing
  districtSearchGroupStructure: IFormStructure[] = []; // Form structure for district search fields
  districtDetailsData: RowData = DistrictDetails; // Row data for the district table

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private districtService: DistrictService, // District Service to manage district data
    private stateService: StateService, // District Service to manage district data
    private loaderService: LoaderService, // Loader Service to show loading indicators
  ) {}

  ngOnInit(): void {
    this.initializeForm(); // Initialize the form based on route and mode
    this.setupRouteParams(); // Extract route parameters (edit/view/create)
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.loadDistrictData(); // Load district data if the ID is available (for edit/view)
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Unsubscribe to prevent memory leaks
  }

  // Setup route parameters to determine if we are in view, edit, or create mode
  private setupRouteParams(): void {
    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe((params) => {
        this.routeId = params.get('id'); // Get the district ID from the route
        this.routeName = this.activatedRoute.snapshot.url[0].path; // Get the route name (view/edit/create)
      })
    );
  }

  // Initialize form structure and set up field settings (like disabling inputs in view mode)
  private initializeForm(): void {
    this.districtSearchGroupStructure = JSON.parse(JSON.stringify(DistrictSearchGroup)); // Deep clone form structure
    
    // Iterate through the form fields to adjust settings (like disabling inputs for view mode)
    this.districtSearchGroupStructure.forEach((field) => {
      if (this.routeName === 'view') {
        field.disable = true; // Disable fields in view mode
      }
      if (field.type === 'select') {
        this.setOptionValues(field); // Populate select options based on the list name
      }
    });
  }

  /**
   * Sets option values for select elements based on the list name.
   * @param element The form structure element to populate.
   */
  private setOptionValues(element: any): void {
    switch (element.listName) {
      case 'state_list':
        this.subscriptions.add(this.stateService.getAllState().subscribe({
          next: (value) => {
            element.listData = value.data; // Populate state list
          }
        }));
        break;
      case 'status_list':
        element.listData = ACTIVE_INACTIVE_LISTDATA.activeInactive; // Populate status list
        break;
      // Additional cases for other select lists can be added here if needed.
    }
  }

  // Fetch district details by ID for editing or viewing
  private loadDistrictData(): void {
    this.loaderService.showLoader();
    this.subscriptions.add(
      this.districtService.getDistrict(this.routeId!).subscribe({
        next: (response) => {
          this.loaderService.hideLoader();
          this.districtDetailsData.data = response?.data; // Assign fetched district data to form
        },
        error: () => {
          this.loaderService.hideLoader();
          this.toastService.open('Error fetching district data.', 'error'); // Show error if loading fails
        }
      })
    );
  }

  // Handle form submission (Create or Edit)
  handleSubmit(event: any): void {
    const formData = JSON.parse(JSON.stringify(event.formValue)); // Create a deep copy of form data
    
    this.loaderService.showLoader();
    switch (this.routeName) {
      case 'create':
        this.subscriptions.add(this.districtService.createDistrict(formData).subscribe({
          next: value => {
            this.loaderService.hideLoader();
            const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl('/district-master'); // Redirect to district list after success
          },
          error: err => {
            this.loaderService.hideLoader();
            const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong!';
            this.toastService.open(message, 'error');
          }
        }));
        break;
      case 'edit':
        this.subscriptions.add(this.districtService.updateDistrict(formData, this.routeId!).subscribe({
          next: value => {
            this.loaderService.hideLoader();
            const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl('/district-master'); // Redirect to district list after success
          },
          error: err => {
            this.loaderService.hideLoader();
            const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong!';
            this.toastService.open(message, 'error');
          }
        }));
        break;
    }
  }
}