import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { ToastService } from '@shared/services/toast.service';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import {
  RolePagePermissionGroup,
  RolePermissionDetails,
  RolePermissionFormGroup
} from '@shared/configs/permission-config';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { Permission } from '@shared/models/Permission.model';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-modify-role-page-permission',
  standalone: false,
  templateUrl: './modify-role-page-permission.component.html',
  styleUrl: './modify-role-page-permission.component.scss'
})
export class ModifyRolePagePermissionComponent
  implements OnInit, AfterViewInit, OnDestroy {
  // Subscription container for managing and unsubscribing observables
  subs: Subscription = new Subscription();

  // Route mode: 'create', 'edit', or 'view'
  routeName: string | undefined;

  // ID fetched from the route for 'edit' or 'view' mode
  routeId: string | null = null;

  // Form structure for dynamic form rendering
  roleSearchGroupStructure: IFormStructure[] = [];

  // Holds the data to populate in the form
  roleDetailsData: RowData = RolePermissionDetails;

  // List of all available permissions fetched from the backend
  permissionsArray: Permission[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private permissionControllerService: PermissionControllerService,
    private toastService: ToastService,
    private loader: LoaderService,
    public cdr: ChangeDetectorRef
  ) { }

  /**
   * Lifecycle hook - initializes form structure, gets route parameters,
   * and sets up the page mode ('create', 'edit', or 'view')
   */
  ngOnInit(): void {
    this.roleSearchGroupStructure = JSON.parse(JSON.stringify(RolePagePermissionGroup));

    this.activatedRoute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });

    this.initialization();
  }

  /**
   * Lifecycle hook - fetch data for edit/view mode after view is initialized
   */
  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getRolePagePermissionById();
    }
  }

  /**
   * Lifecycle hook - unsubscribes all active subscriptions to avoid memory leaks
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Initializes select fields and disables form in view-only mode
   */
  initialization(): void {
    this.roleSearchGroupStructure.forEach(ele => {
      if (ele.type === 'select') {
        this.setOptionValues(ele);
      }
      if (this.routeName === 'view') {
        ele.disable = true;
      }
    });
  }

  /**
   * Populates dropdown options based on listName
   */
  setOptionValues(ele: IFormStructure): void {
    switch (ele.listName) {
      case 'page-id':
        this.subs.add(this.permissionControllerService.getAllPages().subscribe({
          next: (value) => ele.listData = value.data
        }));
        break;

      case 'role-id':
        this.subs.add(this.permissionControllerService.getAllRole().subscribe({
          next: (value) => ele.listData = value.data
        }));
        break;

      case 'permission-id':
        this.subs.add(this.permissionControllerService.getAllPermissions().subscribe({
          next: (value) => {
            ele.listData = value.data;
            this.permissionsArray = value.data;
          }
        }));
        break;
    }
  }

  /**
   * Fetches role-page permission data by ID and populates the form
   */
  getRolePagePermissionById(): void {
    this.loader.showLoader();
    this.subs.add(this.permissionControllerService.getAllRolePermissionsID(this.routeId).subscribe({
      next: value => {
        this.loader.hideLoader();
        this.roleDetailsData.data = value.data;
        const result = this.getPermissionsFromDescription(value.data.description);
        const resultArray: any = result.map(permission => permission.permission_id);
        this.roleDetailsData.data.permission_id = resultArray;
        this.roleDetailsData.data = { ...this.roleDetailsData.data };
      },
      error: () => {
        this.loader.hideLoader();
      }
    }));
  }

  /**
   * Parses the permission description to return a list of matching permission objects
   */
  getPermissionsFromDescription(description: string): Permission[] {
    const permissionNames = description.split(' + ').map(name => name.trim());
    return this.permissionsArray.filter(permission =>
      permissionNames[0].includes(permission.permission)
    );
  }

  /**
   * Handles dynamic changes on form fields such as page, role, or permission selection
   */
  handleSelectValueChange(event: any): void {
    if (event.role_id) return;

    if (event?.page_id) {
      this.setPermissionDataViaPageId(event.page_id);
    }

    if ('permission_id' in event[0]) {
      const totalPermissionValues = event.reduce((total: number, current: any) => {
        return total + (current.permission_values || 0);
      }, 0);

      const description = this.generatePermissionDescription(event);
      this.roleDetailsData.data.description = description;
      this.roleDetailsData.data.permission = totalPermissionValues;

      const resultArray: any = event.map((permission: any) => permission.permission_id);
      this.roleDetailsData.data.permission_id = resultArray;
      this.roleDetailsData.data = { ...this.roleDetailsData.data };
    }

    this.cdr.detectChanges();
  }

  /**
   * Fetches permission options based on selected page ID
   */
  setPermissionDataViaPageId(id: any): void {
    this.loader.showLoader();
    this.subs.add(this.permissionControllerService.getAllPagePermissionByPageId(id).subscribe({
      next: (value) => {
        this.loader.hideLoader();
        this.roleSearchGroupStructure.forEach(ele => {
          if (ele.name === 'permission_id') {
            ele.listData = value.data;
          }
        });
      },
      error: () => {
        this.loader.hideLoader();
      }
    }));
  }

  /**
   * Generates a '+' separated string from selected permission names
   */
  generatePermissionDescription(permissions: Permission[]): string {
    const activePermissions: string[] = [];
    permissions.forEach(permission => {
      activePermissions.push(permission.permission);
    });
    return activePermissions.join(' + ');
  }

  /**
   * Handles form submission for create and edit operations
   */
  handleSubmit(event: any): void {
    const formData = JSON.parse(JSON.stringify(event.formValue));
    this.loader.showLoader();

    switch (this.routeName) {
      case 'create':
        this.subs.add(this.permissionControllerService.createRolepermission(formData).subscribe({
          next: value => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl('/role-permission');
          },
          error: err => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong!';
            this.toastService.open(message, 'error');
          }
        }));
        break;

      case 'edit':
        this.subs.add(this.permissionControllerService.updateRolepermission(formData, this.routeId!).subscribe({
          next: value => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl('/role-permission');
          },
          error: err => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong!';
            this.toastService.open(message, 'error');
          }
        }));
        break;
    }
  }
}
