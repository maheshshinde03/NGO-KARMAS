// Angular Core Imports
import { AfterViewInit, OnInit, OnDestroy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { PagePermissionService } from '@shared/_http/page-permission.service';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { ToastService } from '@shared/services/toast.service';

// Configs & Constants
import {
  PagePermissionDetailsData,
  PagePermissionSearchGroup
} from '@shared/configs/page-permission-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';

// Models
import { Permission } from '@shared/models/Permission.model';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-modify-page-permission',
  standalone: false,
  templateUrl: './modify-page-permission.component.html',
  styleUrls: ['./modify-page-permission.component.scss']
})
export class ModifyPagePermissionComponent implements OnInit, AfterViewInit, OnDestroy {

  subs: Subscription;
  routeName: string;
  routeId: string | null;

  // Form structure and table configuration
  PagePermissionSearchGroupStructure: IFormStructure[] = PagePermissionSearchGroup;
  PagePermissionDetailsData: RowData = PagePermissionDetailsData;

  permissionsArray: Permission[];

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private pagePermissionService: PagePermissionService,
    private permissionControllerService: PermissionControllerService,
    private toastService: ToastService,
    public loader: LoaderService
  ) { }

  /**
   * Angular lifecycle hook: Component initialization
   * - Initializes subscriptions
   * - Extracts route path and ID
   * - Prepares form and disables fields if in 'view' mode
   */
  ngOnInit(): void {
    this.subs = new Subscription();

    // Get current route name (create/edit/view)
    this.activatedroute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path ?? '';
    });

    // Get route ID param if available (for edit/view)
    this.activatedroute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });

    this.initialization();
  }

  /**
   * Angular lifecycle hook: After view is initialized
   * - Load existing data if editing or viewing
   */
  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getPagePermission();
    }
  }

  /**
   * Angular lifecycle hook: Cleanup
   * - Unsubscribe from all active subscriptions
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Form and UI initialization logic
   * - Populates select options dynamically
   * - Disables fields in view mode
   */
  initialization(): void {
    this.PagePermissionSearchGroupStructure.forEach((ele) => {
      if (ele.type === 'select') {
        this.setOptionValues(ele);
      }

      if (this.routeName === 'view') {
        ele.disable = true;
      }
    });
  }

  /**
   * Populate dropdown options based on listName
   * @param ele - Form element configuration
   */
  setOptionValues(ele: any): void {
    switch (ele.listName) {
      case 'page-id':
        this.subs.add(this.permissionControllerService.getAllPages().subscribe({
          next: (res) => {
            ele.listData = res.data;
          }
        }));
        break;

      case 'permission-id':
        this.subs.add(this.permissionControllerService.getAllPermissions().subscribe({
          next: (res) => {
            ele.listData = res.data;
            this.permissionsArray = res.data;
          }
        }));
        break;
    }
  }

  /**
   * Fetch existing permission details for edit/view
   */
  getPagePermission(): void {
    if (this.routeId) {
      this.loader.showLoader();
      this.subs.add(this.pagePermissionService.getPagePermission(this.routeId).subscribe({
        next: (res) => {
          const data = res.data;
          this.PagePermissionDetailsData.data = data;

          // Parse permission names from description to IDs
          const matchedPermissions = this.getPermissionsFromDescription(data.permission);
          const permissionIds = matchedPermissions.map(p => p.permission_id);

          this.PagePermissionDetailsData.data.permission_id = permissionIds;
          this.PagePermissionDetailsData.data = { ...this.PagePermissionDetailsData.data };
          this.loader.hideLoader();
        },error:(err) =>{
          this.loader.hideLoader();
        }
      }));
    }
  }

  /**
   * Convert permission description text into matching permission objects
   * @param description - Permission description from API
   * @returns Array of matching permissions
   */
  getPermissionsFromDescription(description: string): Permission[] {
    const permissionNames = description.split(' + ').map(name => name.trim().toLowerCase());
    return this.permissionsArray.filter(permission =>
      permissionNames.includes(permission.permission.toLowerCase())
    );
  }

  /**
   * Handle form submit for create or edit
   * @param event - Form submission event with form values
   */
  handleSubmit(event: any): void {
    const formData = { ...event.formValue };

    // Build permission list array
    formData.pagePermissionList = formData.permission_id.map((permissionId: string) => ({
      page_id: formData.page_id,
      permission_id: permissionId
    }));

    delete formData.permission_id; // Clean up form data

    const serviceCall = this.permissionControllerService.createUpdatePagePermission(formData);

    this.subs.add(serviceCall.subscribe({
      next: (res) => {
        const msg = responseMessages.codes.find(item => item.code === res.error_message)?.message ?? 'Success';
        this.toastService.open(msg, 'success');
        this.router.navigateByUrl('/page-permission');
      },
      error: (err) => {
        const msg = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong!';
        this.toastService.open(msg, 'error');
      }
    }));
  }

  /**
   * Handle toggle/switch field change in the form
   * @param item - Form control being toggled
   * @param event - New value (true/false)
   */
  handleSwitchChange(item: any, event: boolean): void {
    item.value = event;
  }
}
