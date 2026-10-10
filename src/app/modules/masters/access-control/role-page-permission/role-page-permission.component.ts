import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { RolePermissionDetails } from '@shared/configs/permission-config';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-role-page-permission',
  standalone: false,
  templateUrl: './role-page-permission.component.html',
  styleUrl: './role-page-permission.component.scss'
})
export class RolePagePermissionComponent implements OnInit {
  // Holds the table configuration and data for role-page permissions
  roleDetailsData: any = RolePermissionDetails;

  // Manages all observable subscriptions
  subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private permissionControllerService: PermissionControllerService,
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
    this.loader.showLoader();
    this.subs.add(
      this.permissionControllerService.getAllRolePermissions().subscribe({
        next: (value) => {
          this.loader.hideLoader();
          console.log('getAllPageRolesPermission:', value.data);
          this.roleDetailsData.data = value.data;
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
    this.router.navigateByUrl('/role-permission/create');
  }

  /**
   * Deletes a role-page permission by ID
   * @param event - ID of the role-page permission to delete
   */
  handleDeleteAction(event: any): void {
    this.loader.showLoader();
    this.subs.add(
      this.permissionControllerService.deleteRolePermissionById(event).subscribe({
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
    this.router.navigateByUrl(`/role-permission/edit/${event}`);
  }

  /**
   * Navigates to the view-only page of a role-page permission
   * @param event - ID of the role-page permission to view
   */
  handleViewAction(event: any): void {
    this.router.navigateByUrl(`/role-permission/view/${event}`);
  }
}
