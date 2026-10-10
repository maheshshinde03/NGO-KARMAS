import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from '@shared/_http/city.service';
import { CountryService } from '@shared/_http/country.service';
import { DistrictService } from '@shared/_http/district.service';
import { StateService } from '@shared/_http/state.service';
import { CityDetailsData, CityTypeSearchGroup } from '@shared/configs/city-config';
import { YES_NO_LISTDATA } from '@shared/configs/yesNoSelect-config';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-city',
  templateUrl: './modify-city.component.html',
  styleUrl: './modify-city.component.scss'
})
export class ModifyCityComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  routeName: string | undefined;
  routeId: string | null;
  citySearchGroupStructure: IFormStructure[];
  cityDetailsData: RowData = CityDetailsData; // Table structure for cities
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private cityService: CityService,
    private loaderService: LoaderService,
    private countryService:CountryService,
    private districtService:DistrictService,
    private stateService:StateService
  ) {}

  ngOnInit(): void {
    this.initializeForm(); // Initialize form based on route and mode
    this.setupRouteParams(); // Extract route parameters
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.loadCityData(); // Load city data when the ID is available
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // Setup route parameters for mode (view, edit)
  private setupRouteParams(): void {
    this.subscriptions.add(
      this.activatedRoute.paramMap.subscribe((params) => {
        this.routeId = params.get('id');
        this.routeName = this.activatedRoute.snapshot.url[0].path;
      })
    );
  }

  // Initialize form data based on route (view, edit, create)
  private initializeForm(): void {
    this.citySearchGroupStructure = JSON.parse(JSON.stringify(CityTypeSearchGroup));  // Assuming CitySearchGroup is defined
    this.citySearchGroupStructure.forEach((field) => {
      if (this.routeName === 'view') {
        field.disable = true;  // Disable fields in view mode
      }

      if (field.type === 'select') {
        this.setOptionValues(field); // Populate select options
      }
    });
  }

  private setOptionValues(element: any): void {
    switch (element.listName) {
      case 'country':
        this.subscriptions.add(this.countryService.getAllCountry().subscribe({
          next: (value) => {
            element.listData = value.data
          }
        }))
        break
      case 'state':
        this.subscriptions.add(this.stateService.getAllState().subscribe({
          next: (value) => {
            element.listData = value.data
          }
        }))
        break
      case 'status_list':
        element.listData = YES_NO_LISTDATA;
        break;
      // Additional cases for other lists can be added here.
    }
  }

  // Fetch City details by ID
  private loadCityData(): void {
    this.loaderService.showLoader();
    this.subscriptions.add(
      this.cityService.getCity(this.routeId!).subscribe({
        next: (response) => {
          this.cityDetailsData.data = response.data
          this.loaderService.hideLoader();
          // Handle response and populate the form with data
        },
        error: () => {
          this.loaderService.hideLoader();
        }
      })
    );
  }

  // Handle form submission
  handleSubmit(event: any): void {
    const formData = JSON.parse(JSON.stringify(event.formValue)); // Create a deep copy of form data

    this.loaderService.showLoader();
    switch (this.routeName) {
      case 'create':
        this.subscriptions.add(this.cityService.createCity(formData).subscribe({
          next: (value) => {
            this.loaderService.hideLoader();
            this.toastService.open('City created successfully', 'success');
            this.router.navigateByUrl('/city-master');
          },
          error: (err) => {
            this.loaderService.hideLoader();
            this.toastService.open('Something went wrong!', 'error');
          }
        }));
        break;
      case 'edit':
        this.subscriptions.add(this.cityService.updateCity(formData, this.routeId!).subscribe({
          next: (value) => {
            this.loaderService.hideLoader();
            this.toastService.open('City updated successfully', 'success');
            this.router.navigateByUrl('/city-master');
          },
          error: (err) => {
            this.loaderService.hideLoader();
            this.toastService.open('Something went wrong!', 'error');
          }
        }));
        break;
    }
  }
}