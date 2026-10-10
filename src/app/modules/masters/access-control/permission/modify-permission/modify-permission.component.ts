import { AfterViewInit, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { PermissionDetails, PermissionFormGroup } from '@shared/configs/permission-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-permission',
  standalone: false,
  templateUrl: './modify-permission.component.html',
  styleUrl: './modify-permission.component.scss'
})
export class ModifyPermissionComponent implements OnInit, AfterViewInit {

  // Subscription object to manage observable subscriptions
  subs: any;

  // Holds the route name (create/edit/view)
  routeName: any;

  // ID of the permission (for edit/view)
  routeId: any;

  // Form structure for permission module
  PermissionGroupStructure!: IFormStructure[];

  // Holds permission data for view/edit mode
  permissionDetailsData: RowData = PermissionDetails;

  constructor(
    private router: Router,
    private activatedroute: ActivatedRoute,
    private permissionService: PermissionControllerService,
    private toastService: ToastService,
    private loader: LoaderService
  ) {}

  /**
   * Lifecycle hook - initializes form structure, route parameters, and form mode
   */
  ngOnInit(): void {
    this.subs = new Subscription();
    this.PermissionGroupStructure = JSON.parse(JSON.stringify(PermissionFormGroup));

    // Get the route mode (create/edit/view)
    this.activatedroute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });

    // Get the permission ID from route if present
    this.activatedroute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });

    this.initialization();
  }

  /**
   * Lifecycle hook - fetches data if in edit/view mode
   */
  ngAfterViewInit(): void {
    if (this.routeId) this.getPermission();
  }

  /**
   * Lifecycle hook - cleans up subscriptions
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Initialize form structure (disable in view mode, load dropdowns)
   */
  initialization(): void {
    this.PermissionGroupStructure.forEach((ele, index) => {
      // Populate select dropdowns dynamically
      if (ele.type == 'select') this.setOptionValues(ele);

      // Disable all fields in view mode
      if (this.routeName == 'view') ele.disable = true;
    });
  }

  /**
   * Dynamically sets options for select-type fields
   * @param ele - form element to populate
   */
  setOptionValues(ele: any) {
    switch (ele.listName) {
      case "service-type":
        this.subs.add(
          this.permissionService.getAllPermissions().subscribe({
            next: (value) => {
              ele.listData = value.data;
            }
          })
        );
        break;
    }
  }

  /**
   * Fetches permission data by ID (for edit/view mode)
   */
  getPermission() {
    this.loader.showLoader();
    this.subs.add(
      this.permissionService.getAllPermissionsByID(this.routeId).subscribe({
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
   * Handles form submission for create and edit modes
   * @param event - form submit event containing form values
   */
  handleSubmit(event: any) {
    const formData = JSON.parse(JSON.stringify(event["formValue"]));
    this.loader.showLoader();

    switch (this.routeName) {
      case 'create':
        this.subs.add(
          this.permissionService.createPermission(formData).subscribe({
            next: (value) => {
              this.loader.hideLoader();
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl("/permission");
            },
            error: (err) => {
              this.loader.hideLoader();
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;

      case 'edit':
        this.subs.add(
          this.permissionService.updatePermission(formData, this.routeId).subscribe({
            next: (value) => {
              this.loader.hideLoader();
              const message = responseMessages.codes.find(item => item.code == value.error_message)?.message ?? '';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl("/permission");
            },
            error: (err) => {
              this.loader.hideLoader();
              const message = responseMessages.codes.find(item => item.code == err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;
    }
  }
}
