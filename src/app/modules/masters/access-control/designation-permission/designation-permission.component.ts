import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesignationPermissionControllerService } from '@shared/_http/designation-permission.service';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { DesignationPermissionDetails } from '@shared/configs/designation-permission-config';
import { RolePermissionDetails } from '@shared/configs/permission-config';
import { LoaderService } from '@shared/services/loader.service';
import { currentUser } from '@shared/utils/current-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-designation-permission',
  templateUrl: './designation-permission.component.html',
  styleUrl: './designation-permission.component.scss'
})
export class DesignationPermissionComponent implements OnInit {
  // Holds the table configuration and data for role-page permissions
  DesignationDetailsData: any = DesignationPermissionDetails;

  // Manages all observable subscriptions
  subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private permissionControllerService: DesignationPermissionControllerService,
    private loader: LoaderService
  ) {}

  /**
   * Lifecycle hook - Component initialization
   */
  ngOnInit(): void {
    this.getAllRolePagePermissions();
  }

  /**
   * Lifecycle hook - Component cleanup
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Fetches all role-page permissions from the backend
   */
  getAllRolePagePermissions(): void {
    const ngoDesignation = currentUser().ngo_id
    this.loader.showLoader();
    this.subs.add(
      this.permissionControllerService.getAllDesignationByNgoId(ngoDesignation).subscribe({
        next: (value) => {
          this.loader.hideLoader();
          console.log('getAllPageRolesPermission:', value.data);
          this.DesignationDetailsData.data = value.data;
        },
        error: (error) => {
          this.loader.hideLoader();
          console.error('Error fetching role-page permissions:', error);
        }
      })
    );
  }

  /**
   * Navigates to the create role-page permission form
   */
  handleCreateAction(): void {
    this.router.navigateByUrl('/designation-permission/create');
  }

  /**
   * Deletes a role-page permission by ID
   * @param event - ID of the role-page permission to delete
   */
  handleDeleteAction(event: any): void {
    this.loader.showLoader();
    this.subs.add(
      this.permissionControllerService.deleteDesignationPermissionById(event).subscribe({
        next: () => {
          this.loader.hideLoader();
          this.getAllRolePagePermissions();
        },
        error: (error) => {
          this.loader.hideLoader();
          console.error('Error deleting role-page permission:', error);
        }
      })
    );
  }

  /**
   * Navigates to the edit role-page permission form
   * @param event - ID of the role-page permission to edit
   */
  handleEditAction(event: any): void {
    this.router.navigateByUrl(`/designation-permission/edit/${event}`);
  }

  /**
   * Navigates to the view-only page of a role-page permission
   * @param event - ID of the role-page permission to view
   */
  handleViewAction(event: any): void {
    this.router.navigateByUrl(`/designation-permission/view/${event}`);
  }
}
