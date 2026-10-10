// Angular Core Imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

// RxJS
import { Subscription } from 'rxjs';

// Services
import { PagePermissionService } from '@shared/_http/page-permission.service'; // Optional/Unused: Remove if not used
import { PermissionControllerService } from '@shared/_http/permissions.service';

// Configs & Models
import { PagePermissionDetailsData } from '@shared/configs/page-permission-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-page-permission',
  standalone: false,
  templateUrl: './page-permission.component.html',
  styleUrls: ['./page-permission.component.scss']
})
export class PagePermissionComponent implements OnInit, OnDestroy {

  // Holds table configuration and data for the permission table
  PagePermissionDetailsData: RowData = PagePermissionDetailsData;

  // Manages all subscriptions to prevent memory leaks
  subs: Subscription;

  constructor(
    private router: Router,
    private permissionControllerService: PermissionControllerService,
    private loader:LoaderService
  ) {}

  /**
   * Lifecycle hook: Component initialization
   * ----------------------------------------
   * - Initializes the subscription container
   * - Loads all page permissions
   */
  ngOnInit(): void {
    this.subs = new Subscription();
    this.getAllPagePermissions();
  }

  /**
   * Lifecycle hook: Component cleanup
   * ----------------------------------
   * - Unsubscribes from all active observables to prevent memory leaks
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Fetch all page permissions from the backend and bind to the table data
   */
  getAllPagePermissions(): void {
    this.loader.showLoader();
    this.subs.add(
      this.permissionControllerService.getAllPagePermission().subscribe({
        next: (res) => {
          console.log('Fetched Permissions:', res.data);
          this.PagePermissionDetailsData.data = res.data;
          this.loader.hideLoader();
        },error:() => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Handles "Create" button click
   * Navigates to the page permission creation form
   */
  handleCreateAction(): void {
    this.router.navigateByUrl('/page-permission/create');
  }

  /**
   * Handles deletion of a page permission by ID
   * @param event - ID of the page permission to be deleted
   */
  handleDeleteAction(event: any): void {
    this.subs.add(
      this.permissionControllerService.deletePagePermissionById(event).subscribe({
        next: () => {
          this.getAllPagePermissions(); // Refresh list after deletion
        }
      })
    );
  }

  /**
   * Handles edit action
   * Navigates to the edit form for the selected permission
   * @param event - ID of the permission to edit
   */
  handleEditAction(event: any): void {
    this.router.navigateByUrl(`/page-permission/edit/${event}`);
  }

  /**
   * Handles view action
   * Navigates to the read-only view page of the selected permission
   * @param event - ID of the permission to view
   */
  handleViewAction(event: any): void {
    this.router.navigateByUrl(`/page-permission/view/${event}`);
  }
}
