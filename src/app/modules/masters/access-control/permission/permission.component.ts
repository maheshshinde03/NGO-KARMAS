import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { PermissionDetails } from '@shared/configs/permission-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-permission',
  standalone: false,
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss'
})
export class PermissionComponent {

  // Holds table configuration and permission list data
  permissionDetailsData: RowData = PermissionDetails;

  // Manages active subscriptions for cleanup
  subs: any;

  constructor(
    private router: Router,
    private permissionService: PermissionControllerService,
    private loader: LoaderService
  ) {}

  /**
   * Lifecycle hook - initializes subscriptions and fetches permission list
   */
  ngOnInit(): void {
    this.subs = new Subscription();
    this.getAllPermissions();
  }

  /**
   * Lifecycle hook - unsubscribes to avoid memory leaks
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * API call to fetch all permissions
   * Updates the data source used for displaying in the table
   */
  getAllPermissions(): void {
    this.loader.showLoader();
    this.subs.add(
      this.permissionService.getAllPermissions().subscribe({
        next: (value) => {
          this.loader.hideLoader();
          this.permissionDetailsData.data = value.data;
        },
        error: () => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Navigates to the create permission form
   */
  handleCreateAction(): void {
    this.router.navigateByUrl("/permission/create");
  }

  /**
   * Deletes a permission entry by ID and refreshes the list
   * @param event - ID of the permission to delete
   */
  handleDeleteAction(event: any): void {
    this.subs.add(
      this.permissionService.deletePermissionsById(event).subscribe({
        next: () => {
          this.getAllPermissions();
        }
      })
    );
  }

  /**
   * Navigates to the edit form for a given permission ID
   * @param event - ID of the permission to edit
   */
  handleEditAction(event: any): void {
    this.router.navigateByUrl(`/permission/edit/${event}`);
  }

  /**
   * Navigates to the view page for a given permission ID
   * @param event - ID of the permission to view
   */
  handleViewAction(event: any): void {
    this.router.navigateByUrl(`/permission/view/${event}`);
  }
}
