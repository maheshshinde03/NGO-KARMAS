import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CountryService } from '@shared/_http/country.service';
import { CountryDetailsData } from '@shared/configs/country-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrl: './country.component.scss'
})
export class CountryComponent implements OnInit, OnDestroy {
  countryDetailsData: RowData = CountryDetailsData; // Country table data structure
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private countryService: CountryService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.loadCountryList(); // Load country list data
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Cleanup subscriptions to avoid memory leaks
  }

  // Fetch country list from the API
  loadCountryList(): void {
    this.loaderService.showLoader();
    this.subscriptions.add(
      this.countryService.getAllCountry().subscribe({
        next: (response) => {
          this.loaderService.hideLoader();
          this.countryDetailsData.data = response?.data || []; // Populate the table with country data
        },
        error: (error) => {
          this.loaderService.hideLoader();
          console.error('Error fetching country list:', error);
        }
      })
    );
  }

  // Handle the create country action
  handleCreateAction(): void {
    this.router.navigateByUrl('/country/create');
  }

  // Handle the delete action
  handleDeleteAction(event: any): void {
    // console.warn('Delete action not implemented:', event);
    this.loaderService.showLoader();
    this.subscriptions.add(
      this.countryService.deleteCountry(event).subscribe({
        next: (response) => {
          this.loaderService.hideLoader();
          this.loadCountryList(); // Load country list data
        },
        error: (error) => {
          this.loaderService.hideLoader();
          console.error('Error fetching country list:', error);
        }
      })
    );
  }

  // Handle the edit action
  handleEditAction(countryId: any): void {
    this.router.navigateByUrl(`/country/edit/${countryId}`);
  }

  // Handle the view action
  handleViewAction(countryId: any): void {
    this.router.navigateByUrl(`/country/view/${countryId}`);
  }
}