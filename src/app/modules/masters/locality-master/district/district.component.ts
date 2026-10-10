import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DistrictService } from '@shared/_http/district.service';  // Assuming you have a service for district operations
import { DistrictDetails } from '@shared/configs/district.config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service'; // Service for showing toast messages
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrl: './district.component.scss'
})
export class DistrictComponent implements OnInit, OnDestroy {
  districtDetailsData: RowData = DistrictDetails; // Table structure for districts
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private districtService: DistrictService,
    private loaderService: LoaderService,
    private toastService: ToastService // ToastService for notifications
  ) { }

  ngOnInit(): void {
    this.loadDistrictList(); // Load District list data on component initialization
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Cleanup subscriptions to avoid memory leaks
  }

  // Fetch district list data from API
  loadDistrictList(): void {
    this.loaderService.showLoader();
    this.subscriptions.add(
      this.districtService.getAllDistrict().subscribe({
        next: (response) => {
          this.loaderService.hideLoader();
          if (response?.data) {
            this.districtDetailsData.data = response.data; // Assign data to table
          } else {
            this.toastService.open('No data available.', 'warning');
          }
        },
        error: (error) => {
          this.loaderService.hideLoader();
          console.error('Error fetching district list:', error);
          this.toastService.open('Error fetching data, please try again.', 'error');
        }
      })
    );
  }

  // Handle the create district action
  handleCreateAction(): void {
    this.navigateTo('/district-master/create');
  }

  // Handle the edit action
  handleEditAction(districtId: any): void {
    this.navigateTo(`/district-master/edit/${districtId}`);
  }

  // Handle the view action
  handleViewAction(districtId: any): void {
    this.navigateTo(`/district-master/view/${districtId}`);
  }

  // Centralized navigation function
  private navigateTo(path: string): void {
    this.router.navigateByUrl(path);
  }

  // Handle the delete action (To be implemented as per business logic)
  handleDeleteAction(districtId: any): void {
    console.warn('Delete action not implemented:', districtId);
    // Implement the logic for deleting a district (could show a confirmation modal)

    this.loaderService.showLoader();
    this.subscriptions.add(
      this.districtService.deleteDistrict(districtId).subscribe({
        next: (response) => {
          this.loaderService.hideLoader();
          this.loadDistrictList();
        },
        error: (error) => {
          this.loaderService.hideLoader();
          console.error('Error fetching district list:', error);
          this.toastService.open('Error fetching data, please try again.', 'error');
        }
      })
    );
  }
}