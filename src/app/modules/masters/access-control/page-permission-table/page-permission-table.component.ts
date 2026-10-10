import { Component, OnInit, OnDestroy } from '@angular/core';
import { PermissionPageTableControllerService } from '@shared/_http/permissions-table.service';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { RoleWisePagePermissionGroupTable } from '@shared/configs/permission-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { PagePermission } from '@shared/models/page-permission.model';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { currentUser } from '@shared/utils/current-user';
import { EncryptionAPILayer } from '@shared/utils/encryption-api';
import { Subscription } from 'rxjs';

interface ResBody {
  permission: number;
  role_id: number;
  page_id: number;
  permission_id: number[];
  description: string;
  created_by: number;
}

interface TransformedPage {
  [key: string]: {
    resBody: ResBody;
  };
}

@Component({
  selector: 'app-page-permission-table',
  standalone: false,
  templateUrl: './page-permission-table.component.html',
  styleUrl: './page-permission-table.component.scss',
  providers: [PermissionControllerService]
})



export class PagePermissionTableComponent implements OnInit {
  subs: Subscription = new Subscription();
  pages: PagePermission[] = [];
  allPermissions: string[] = [];
  selectedPermissions: { [key: string]: string[] } = {}; // Selected permissions for each page
  selectAllPermissions: { [key: string]: boolean } = {}; // Track "Select All" state for each permission
  selectedRows: string[] = []; // Track selected rows by page_id
  loading: boolean = true;
  error: string | null = null;
  roleSearchGroupStructure: IFormStructure[] = [];
  role_id: any;
  createdBy: any;
  existingPagePermission: any;
  constructor(private pagePermissionService: PermissionControllerService, private pagePermissionTable: PermissionPageTableControllerService, private loader: LoaderService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.roleSearchGroupStructure = JSON.parse(JSON.stringify(RoleWisePagePermissionGroupTable));
    this.initialization();
  }


  initialization(): void {
    this.roleSearchGroupStructure.forEach(ele => {
      if (ele.type === 'select') {
        this.setOptionValues(ele);
      }
    });

    this.loader.showLoader();
    this.pagePermissionService.getAllPagePermissionForTable().subscribe(
      (data) => {
        this.loader.hideLoader();
        const newRes = new EncryptionAPILayer().decryptData(data.resBody); // Decrypt data if necessary
        const dataValue = newRes.data;

        // Initialize a Map to store unique pages by page_id
        const transformedData: Map<string, any> = new Map();

        dataValue.forEach((item: any) => {
          let page = transformedData.get(item.page_id);

          if (!page) {
            page = {
              page_id: item.page_id.toString(),
              page_name: item.page_name,
              permissions: []
            };
            transformedData.set(item.page_id, page);
          }

          if (!page.permissions.includes(item.permission)) {
            page.permissions.push(item.permission);
          }
        });

        const result = { pages: Array.from(transformedData.values()) };

        this.allPermissions = this.getAllUniquePermissions(result.pages); // Extract unique permissions
        this.pages = result.pages;

        // this.pages.forEach(page => {
        //   this.selectedPermissions[page.page_id] = [...page.permissions];
        // });

        this.allPermissions.forEach(permission => {
          this.selectAllPermissions[permission] = this.checkIfAllPagesHavePermission(permission);
        });

        this.loading = false;
      },
      (error) => {
        this.loader.hideLoader();
        this.error = 'Failed to load permissions. Please try again later.';
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setOptionValues(ele: IFormStructure): void {
    switch (ele.listName) {
      case 'role-id':
        this.subs.add(this.pagePermissionTable.getAllRole().subscribe({
          next: (value) => {
            const newRes = new EncryptionAPILayer().decryptData(value.resBody); // Decrypt data if necessary
            const dataValue = newRes.data;
            ele.listData = dataValue
          }
        }))
        break;

      // case "permission-id":
      //   this.subs.add(this.permissionControllerService.getAllPermissions().subscribe({
      //     next: (value) => {
      //       ele.listData = value.data;
      //       this.permissionsArray = value.data;
      //     }
      //   }))
      //   break
    }
  }


  getAllUniquePermissions(pages: PagePermission[]): string[] {
    const permissions = new Set<string>();
    pages.forEach(page => {
      page.permissions.forEach(permission => permissions.add(permission));
    });
    return Array.from(permissions);
  }

  // Handle permission change (checkbox change)
  onPermissionChange(page_id: string, permission: string, event: any): void {
    const isChecked = event.target.checked;

    if (isChecked) {
      this.selectedPermissions[page_id].push(permission);
    } else {
      this.selectedPermissions[page_id] = this.selectedPermissions[page_id].filter(p => p !== permission);
    }

    this.updateSelectAllState(permission);
  }

  // Handle "Select All" click for a particular permission
  onSelectAllChange(permission: string, event: any): void {
    const isChecked = event.target.checked;

    this.pages.forEach(page => {
      if (page.permissions.includes(permission)) {
        if (isChecked) {
          if (!this.selectedPermissions[page.page_id].includes(permission)) {
            this.selectedPermissions[page.page_id].push(permission);
          }
        } else {
          this.selectedPermissions[page.page_id] = this.selectedPermissions[page.page_id].filter(p => p !== permission);
        }
      }
    });

    this.selectAllPermissions[permission] = isChecked;
  }

  // Update "Select All" state when individual checkboxes change
  updateSelectAllState(permission: string): void {
    this.selectAllPermissions[permission] = this.checkIfAllPagesHavePermission(permission);
  }

  // Check if all pages have the specific permission
  checkIfAllPagesHavePermission(permission: string): boolean {
    return this.pages.every(page => page.permissions.includes(permission));
  }

  // Check if all rows are selected
  isAllRowsSelected(): boolean {
    return this.selectedRows.length === this.pages.length;
  }

  // Handle "Select All Rows" change (checkbox for all rows)
  onSelectAllRowsChange(event: any): void {
    const isChecked = event.target.checked;

    // Update the selectedRows array based on the "Select All" checkbox
    this.selectedRows = isChecked ? this.pages.map(page => page.page_id) : [];

    // If Select All Rows is checked, also check all permissions for each row
    if (isChecked) {
      this.pages.forEach(page => {
        this.selectedPermissions[page.page_id] = [...page.permissions]; // Select all permissions for this page
      });
    } else {
      // If deselected, clear permissions for each row
      this.pages.forEach(page => {
        this.selectedPermissions[page.page_id] = [];
      });
    }
  }



  // Handle individual row selection
  onRowSelectChange(page_id: string, event: any): void {
    const isChecked = event.target.checked;

    if (isChecked) {
      // Add the page_id to selected rows
      this.selectedRows.push(page_id);

      // Select all permissions for this page
      const page = this.pages.find(p => p.page_id === page_id);
      if (page) {
        this.selectedPermissions[page.page_id] = [...page.permissions];
      }
    } else {
      // Remove the page_id from selected rows
      this.selectedRows = this.selectedRows.filter(id => id !== page_id);

      // Deselect all permissions for this page
      this.selectedPermissions[page_id] = [];
    }
  }


  handleSelectValueChange(event: any) {
    if (event.role_id) {
      this.role_id = event.role_id
      this.setPermissionDataViaPageId(event.role_id);
    }
    // this.cdr.detectChanges()
  }

  setPermissionDataViaPageId(id: any) {
    this.loader.showLoader();
    this.subs.add(
      this.pagePermissionTable.getAllPageRolePermisisonByID(id).subscribe({
        next: (value) => {
          this.loader.hideLoader();
          const newRes = new EncryptionAPILayer().decryptData(value.resBody); // Decrypt data if necessary
          const dataValue = newRes.data;
          const rolePermissions = dataValue;
          this.existingPagePermission = rolePermissions;
          // // Loop through the role permissions to set them for each page
          // rolePermissions.forEach((permission: any) => {
          //   const pageId = permission.page_id;

          //   // Find the page in the pages array by page_id
          //   const page = this.pages.find(p => p.page_id === pageId.toString());

          //   if (page) {
          //     // Initialize selectedPermissions for the page if it doesn't exist
          //     if (!this.selectedPermissions[pageId]) {
          //       this.selectedPermissions[pageId] = [];
          //     }

          //     // Handle combined permissions like "Add + Edit + Delete + View"
          //     const permissions = permission.description.split(' + ').map((perm: string) => perm.trim());

          //     // Add each individual permission to the selectedPermissions for this page
          //     permissions.forEach((perm: string) => {
          //       if (!this.selectedPermissions[pageId].includes(perm)) {
          //         this.selectedPermissions[pageId].push(perm);
          //       }
          //     });
          //   }
          // });

          // // Optionally, update the "Select All" states
          // this.allPermissions.forEach(permission => {
          //   this.selectAllPermissions[permission] = this.checkIfAllPagesHavePermission(permission);
          // });

          // const userPermissions = data.data;

          // Reset selectedPermissions
          this.selectedPermissions = {};

          // Map the user permissions to selectedPermissions
          rolePermissions.forEach((userPermission: any) => {
            const { page_id, description } = userPermission;

            // If there's no description or it's an empty string, set permissions to an empty array
            if (!description || description.trim() === '') {
              this.selectedPermissions[page_id] = [];
            } else {
              // Extract permissions from the description if available
              const permissions = description.split('+').map((perm: string) => perm.trim());
              // Store the permissions for the page_id
              this.selectedPermissions[page_id] = permissions;
            }
          });

          // If there are no user permissions, initialize empty permissions for all pages
          if (rolePermissions.length === 0) {
            this.pages.forEach((page) => {
              this.selectedPermissions[page.page_id] = [];
            });
          }

          // Set selectAllPermissions based on allPermissions
          this.selectAllPermissions = {}; // Reset before mapping
          this.allPermissions.forEach((permission) => {
            this.selectAllPermissions[permission] = this.checkIfAllPagesHavePermission(permission);
          });

        },
        error: (err) => {
          this.loader.hideLoader();
          // this.error = 'Failed to load role permissions. Please try again later.';
        },
      })
    );
  }

  permissionSubmit() {
    // Log selected permissions
    console.log('this.selectedPermissions =', this.selectedPermissions);

    this.createdBy = currentUser().user_id

    // Transform permissions
    const transformedPages = this.transformPagePermissions(this.selectedPermissions, this.role_id, this.createdBy);

    // Log transformed pages in a readable JSON format
    console.log('Transformed Pages:', JSON.stringify(transformedPages, null, 2));

    transformedPages.forEach(page => {
      const resBody = (Object.values(page)[0] as { resBody: ResBody }).resBody;

      const existingPermission = this.existingPagePermission.find((item: any) => item.page_id === resBody.page_id);

      if (existingPermission) {
        // 🚀 Update Existing Permission
        this.subs.add(this.pagePermissionService.updateRolepermissionForTable(resBody, existingPermission.role_page_permission_id).subscribe({
          next: value => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? 'Permission updated successfully!';
            this.toastService.open(`Updated: Page ID ${resBody.page_id}`, 'success');
          },
          error: err => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong while updating!';
            this.toastService.open(message, 'error');
          }
        }));
      } else {
        // ✅ Create New Permission
        this.subs.add(this.pagePermissionService.createRolepermissionForTable(resBody).subscribe({
          next: value => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? 'Permission created successfully!';
            this.toastService.open(`Created: Page ID ${resBody.page_id}`, 'success');
          },
          error: err => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong while creating!';
            this.toastService.open(message, 'error');
          }
        }));
      }
    });

  }

  transformPagePermissions(
    pagePermissions: { [key: string]: string[] },
    roleId: number,
    createdBy: number
  ): any[] {
    const permissionValueMap = this.allPermissions.reduce((acc: any, perm, index) => {
      acc[perm] = index + 1; // Map permission name to a unique ID (starting from 1)
      return acc;
    }, {});

    return this.pages
      .map(page => {
        const permissions = pagePermissions[page.page_id] || [];
        const permissionIds = permissions.map(permission => permissionValueMap[permission] || 0).filter(id => id !== 0);

        if (permissionIds.length === 0) {
          return null; // Skip if no valid permission IDs
        }

        const description = permissions.join(' + ');

        return {
          [page.page_id]: {
            resBody: {
              permission: 0, // Default value
              role_id: roleId, // Provided role_id
              page_id: Number(page.page_id), // Page ID from pages
              permission_id: permissionIds, // Filtered permission IDs
              description: description, // Description of permissions
              created_by: createdBy // Provided created_by
            }
          }
        };
      })
      .filter(item => item !== null); // Remove null entries
  }


}
