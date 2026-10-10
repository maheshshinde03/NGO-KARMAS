import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CityService } from '@shared/_http/city.service';  // Assuming you have a service for city operations
import { CityDetailsData } from '@shared/configs/city-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service'; // Service for showing toast messages
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrl: './city.component.scss'
})
export class CityComponent  implements OnInit, OnDestroy {
  cityDetailsData: RowData = CityDetailsData; // Table structure for cities
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private cityService: CityService,
    private loaderService: LoaderService,
    private toastService: ToastService // ToastService for notifications
  ) {}

  ngOnInit(): void {
    this.loadCityList(); // Load City list data on component initialization
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Cleanup subscriptions to avoid memory leaks
  }

  // Fetch city list data from API
  loadCityList(): void {
    this.loaderService.showLoader();
    this.subscriptions.add(
      this.cityService.getAllCity().subscribe({
        next: (response) => {
          this.loaderService.hideLoader();
          if (response?.data) {
            this.cityDetailsData.data = response.data; // Assign data to table
          } else {
            this.toastService.open('No data available.', 'warning');
          }
        },
        error: (error) => {
          this.loaderService.hideLoader();
          console.error('Error fetching city list:', error);
          this.toastService.open('Error fetching data, please try again.', 'error');
        }
      })
    );
  }

  // Handle the create city action
  handleCreateAction(): void {
    this.navigateTo('/city-master/create');
  }

  // Handle the edit action
  handleEditAction(cityId: any): void {
    this.navigateTo(`/city-master/edit/${cityId}`);
  }

  // Handle the view action
  handleViewAction(cityId: any): void {
    this.navigateTo(`/city-master/view/${cityId}`);
  }

  // Centralized navigation function
  private navigateTo(path: any): void {
    this.router.navigateByUrl(path);
  }

  // Handle the delete action (To be implemented as per business logic)
  handleDeleteAction(cityId: any): void {
    console.warn('Delete action not implemented:', cityId);
    // Implement the logic for deleting a city (could show a confirmation modal)
    this.loaderService.showLoader();
    this.subscriptions.add(
      this.cityService.deleteCity(cityId).subscribe({
        next: (response) => {
          this.loaderService.hideLoader();
          this.loadCityList();
        },
        error: (error) => {
          this.loaderService.hideLoader();
          console.error('Error fetching city list:', error);
          this.toastService.open('Error fetching data, please try again.', 'error');
        }
      })
    );
  }
}