import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { ToastService } from '@shared/services/toast.service';
import { RoleDetails } from '@shared/configs/permission-config';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-role',
  standalone: false,
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent implements OnInit, OnDestroy {

  // Holds the table data structure and fetched role data
  roleDetailsData: any = RoleDetails;

  // Manages active subscriptions to avoid memory leaks
  subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private permissionControllerService: PermissionControllerService,
    public toastService: ToastService,
    private loader: LoaderService
  ) {}

  /**
   * Angular lifecycle hook - called once the component is initialized
   */
  ngOnInit(): void {
    this.getAllRoles(); // Load role data on component load
  }

  /**
   * Angular lifecycle hook - cleans up subscriptions when component is destroyed
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Fetches all roles from the API and updates the table data
   */
  getAllRoles() {
    this.loader.showLoader();
    this.subs.add(
      this.permissionControllerService.getAllRole().subscribe({
        next: (value) => {
          this.loader.hideLoader();
          this.roleDetailsData.data = value.data;
        },
        error: (err) => {
          console.error('Error fetching roles:', err);
          this.loader.hideLoader();
          const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? '';
          this.toastService.open(message, 'error');
        }
      })
    );
  }

  /**
   * Navigates to the role creation form
   */
  handleCreateAction() {
    this.router.navigateByUrl('/role/create');
  }

  /**
   * Handles role deletion by ID and refreshes the role list
   * @param event - role ID to be deleted
   */
  handleDeleteAction(event: any) {
    this.loader.showLoader();
    this.subs.add(
      this.permissionControllerService.deleteRoleById(event).subscribe({
        next: (value) => {
          this.loader.hideLoader();
          this.getAllRoles(); // Refresh list after deletion
          const message = responseMessages.codes.find(item => item.code === value.message)?.message ?? '';
          this.toastService.open(message, 'success');
        },
        error: (error) => {
          this.loader.hideLoader();
          console.error('Error deleting role:', error);
          const message = responseMessages.codes.find(item => item.code === error.error_message)?.message ?? '';
          this.toastService.open(message, 'error');
        }
      })
    );
  }

  /**
   * Navigates to the edit page for a selected role
   * @param event - role ID to be edited
   */
  handleEditAction(event: any) {
    this.router.navigateByUrl(`/role/edit/${event}`);
  }

  /**
   * Navigates to the view page for a selected role
   * @param event - role ID to be viewed
   */
  handleViewAction(event: any) {
    this.router.navigateByUrl(`/role/view/${event}`);
  }

}
