import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '@shared/_http/state.service';
import { StateDetailsData } from '@shared/configs/state-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrl: './state.component.scss'
})
export class StateComponent implements OnInit, OnDestroy {
  stateDetailsData: RowData = StateDetailsData; // Use StateDetails configuration
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private stateService: StateService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.loadStateList(); // Load state list data when the component initializes
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Cleanup subscriptions to avoid memory leaks
  }

  // Fetch the list of states from the API
  loadStateList(): void {
    this.loaderService.showLoader();
    this.subscriptions.add(
      this.stateService.getAllState().subscribe({
        next: (response) => {
          this.loaderService.hideLoader();
          this.stateDetailsData.data = response?.data || []; // Populate the table with API data
        },
        error: (error) => {
          this.loaderService.hideLoader();
          console.error('Error fetching state list:', error);
        }
      })
    );
  }

  // Handle the create state action
  handleCreateAction(): void {
    this.router.navigateByUrl('/state/create');
  }

  // Handle the delete action
  handleDeleteAction(event: any): void {
    // const stateId = event.rowData.state_id; // Get the state_id from the rowData
    // this.deleteState(stateId);
    this.loaderService.showLoader();
      this.subscriptions.add(
        this.stateService.deleteState(event).subscribe({
          next: (response) => {
            this.loaderService.hideLoader();
            this.loadStateList(); // Refresh the state list after deletion
          },
          error: (error) => {
            this.loaderService.hideLoader();
            console.error('Error deleting state:', error);
          }
        })
      );
  }

  // Handle the edit action
  handleEditAction(stateId: any): void {
    this.router.navigateByUrl(`/state/edit/${stateId}`);
  }

  // Handle the view action
  handleViewAction(stateId: any): void {
    this.router.navigateByUrl(`/state/view/${stateId}`);
  }

  // Delete a state using StateService
  deleteState(stateId: string): void {
    if (confirm('Are you sure you want to delete this state?')) {
      this.loaderService.showLoader();
      this.subscriptions.add(
        this.stateService.deleteState(stateId).subscribe({
          next: (response) => {
            this.loaderService.hideLoader();
            this.loadStateList(); // Refresh the state list after deletion
          },
          error: (error) => {
            this.loaderService.hideLoader();
            console.error('Error deleting state:', error);
          }
        })
      );
    }
  }
}