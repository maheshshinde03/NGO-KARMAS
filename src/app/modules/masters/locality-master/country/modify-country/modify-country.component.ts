import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '@shared/_http/country.service';
import { DistrictService } from '@shared/_http/district.service';
import { CountryDetailsData, CountryTypeSearchGroup } from '@shared/configs/country-config';
import { ACTIVE_INACTIVE_LISTDATA } from '@shared/configs/yesNoSelect-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-country',
  templateUrl: './modify-country.component.html',
  styleUrl: './modify-country.component.scss'
})
export class ModifyCountryComponent implements OnInit, AfterViewInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  routeName: string | undefined;
  routeId: string | null;
  countrySearchGroupStructure: IFormStructure[];
  countryDetailsData: RowData = CountryDetailsData;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private countryService: CountryService,
    private districtService: DistrictService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.initializeForm(); // Initialize form based on route and mode
    this.setupRouteParams(); // Extract route parameters
  }

  ngAfterViewInit(): void {
    if (this.routeId) {
      this.loadCountryData(); // Load country data when ID is available
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

  // Initialize form fields based on route mode
  private initializeForm(): void {
    this.countrySearchGroupStructure = JSON.parse(JSON.stringify(CountryTypeSearchGroup));
      this.countrySearchGroupStructure.forEach((field) => {
        if (this.routeName === 'view') {
          field.disable = true; // Disable controls for view mode
        }
        if (field.type === 'select') {
          this.setOptionValues(field); // Populate select options
        }
      });
  }

  private setOptionValues(element: any): void {
    switch (element.listName) {
      case 'country_list':
        this.subscriptions.add(this.countryService.getAllCountry().subscribe({
          next: (value) => {
            element.listData = value.data
          }
        }))
        break
      case 'district_list':
        this.subscriptions.add(this.districtService.getAllDistrict().subscribe({
          next: (value) => {
            element.listData = value.data
          }
        }))
        break
      case 'status_list':
        element.listData = ACTIVE_INACTIVE_LISTDATA.activeInactive;
        break;
      // Additional cases for other lists can be added here.
    }
  }

  // Fetch country data by ID
  private loadCountryData(): void {
    this.loaderService.showLoader();
    this.subscriptions.add(
      this.countryService.getCountry(this.routeId!).subscribe({
        next: (response) => {
          this.loaderService.hideLoader();
          this.countryDetailsData.data = response?.data; // Populate form data
          this.setGstOrVatField(response?.data);
        },
        error: (error) => {
          this.loaderService.hideLoader();
          console.error('Error fetching country data:', error);
        }
      })
    );
  }

  // Handle form submission
  handleSubmit(event: any): void {
    const formData = event.formValue; // Get form data

    this.loaderService.showLoader();
    switch (this.routeName) {
      case 'create':
        this.subscriptions.add(this.countryService.createCountry(formData).subscribe({
          next: value => {
            this.loaderService.hideLoader();
            const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl('/country');
          },
          error: err => {
            this.loaderService.hideLoader();
            const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong!';
            this.toastService.open(message, 'error');
          }
        }));
        break;
      case 'edit':
        this.subscriptions.add(this.countryService.updateCountry(formData, this.routeId!).subscribe({
          next: value => {
            this.loaderService.hideLoader();
            const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl('/country');
          },
          error: err => {
            this.loaderService.hideLoader();
            const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong!';
            this.toastService.open(message, 'error');
          }
        }));
        break;
    }
    // this.subscriptions.add(
    //   this.countryService.createCountry(formData).subscribe({
    //     next: (response) => {
    //       this.loaderService.hideLoader();
    //       this.toastService.open('Country created/updated successfully!', 'success');
    //       this.router.navigateByUrl('/country');
    //     },
    //     error: (error) => {
    //       this.loaderService.hideLoader();
    //       this.toastService.open('Error creating/updating Country!', 'error');
    //     }
    //   })
    // );
  }

  handleSelectValueChange(event:any){
    if(event.controlName === "tax_type_id"){
      this.setGstOrVatField(event);
      // this.countrySearchGroupStructure.forEach((field) => {
      //   if (field.type === 'select') {
      //     this.setOptionValues(field); // Populate select options
      //   }
      // });
    }
  }

  setGstOrVatField(event:string){
    this.countrySearchGroupStructure.forEach((field) => {
      // if (field.type === 'select') {
        // this.setOptionValues(field); // Populate select option
        this.setFieldProperties(field.name, event, field);
      // }
    });
  }

  setFieldProperties(fieldName: string, event: any, field: any) {
    // Set the required property for pincode
    // if (fieldName === 'pincode' && event?.is_pincode_mandatory !== undefined) {
    //   field.required = event?.is_pincode_mandatory;
    // }
  
    // Set dial code for contact numbers and whatsapp
    if (['cgst', 'sgst', 'igst', 'ugst'].includes(fieldName) && event?.tax_type === "GST") {
      field.hiddenControl = false
    }
    if (['cgst', 'sgst', 'igst', 'ugst'].includes(fieldName) && event?.tax_type === "VAT") {
      field.hiddenControl = true
    }
    if (['vat'].includes(fieldName) && event?.tax_type === "VAT") {
      field.hiddenControl = false
    }
    if (['vat'].includes(fieldName) && event?.tax_type === "GST") {
      field.hiddenControl = true
    }
  }
}