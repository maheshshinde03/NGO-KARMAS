import { AfterViewInit, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { PageDetails, PageFormGroup } from '@shared/configs/permission-config';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { ToastService } from '@shared/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-pages',
  standalone: false,
  templateUrl: './modify-pages.component.html',
  styleUrl: './modify-pages.component.scss'
})
export class ModifyPagesComponent implements OnInit, AfterViewInit {

  subs: Subscription;                            // Manages all subscriptions to prevent memory leaks
  routeName: string;                             // Stores the current route name (create/edit/view)
  pageFormStructure!: IFormStructure[];          // Holds the dynamic form structure
  PageDetailsData: RowData = PageDetails;        // Table configuration with pre-defined settings
  routeId: string | null;                        // ID from the route parameter for edit/view

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private permissionControllerService: PermissionControllerService,
    private toastService: ToastService,
    private loader: LoaderService
  ) {}

  ngOnInit(): void {
    this.subs = new Subscription();

    // Deep clone form group config for safe runtime modifications
    this.pageFormStructure = JSON.parse(JSON.stringify(PageFormGroup));

    // Get current route name (create/edit/view)
    this.activatedRoute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });

    // Get route ID (used in edit/view modes)
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });

    // Initialize form settings like disabling fields in view mode
    this.initialization();
  }

  ngAfterViewInit(): void {
    // Fetch existing page details if in edit or view mode
    if (this.routeId) this.getPage();
  }

  ngOnDestroy(): void {
    // Clean up all subscriptions
    this.subs.unsubscribe();
  }

  /**
   * Disable all form fields if in "view" mode
   */
  initialization(): void {
    this.pageFormStructure.forEach((ele) => {
      if (this.routeName === 'view') ele.disable = true;
    });
  }

  /**
   * Fetch page details by ID and populate in form
   */
  getPage(): void {
    this.loader.showLoader();
    this.subs.add(
      this.permissionControllerService.getAllPageByID(this.routeId).subscribe({
        next: (value) => {
          this.loader.hideLoader();
          this.PageDetailsData.data = value.data;
        },
        error: () => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Handle form submission for create and edit routes
   * @param event - emitted form value from dynamic form
   */
  handleSubmit(event: any): void {
    let formData = JSON.parse(JSON.stringify(event["formValue"]));  // Deep clone form data
    this.loader.showLoader();

    switch (this.routeName) {
      case 'create':
        // API call to create a new page
        this.subs.add(
          this.permissionControllerService.createPage(formData).subscribe({
            next: (value) => {
              this.loader.hideLoader();
              const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? '';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl("/pages");
            },
            error: (err) => {
              this.loader.hideLoader();
              const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;

      case 'edit':
        // API call to update an existing page
        this.subs.add(
          this.permissionControllerService.updatePage(formData, this.routeId).subscribe({
            next: (value) => {
              this.loader.hideLoader();
              const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? '';
              this.toastService.open(message, 'success');
              this.router.navigateByUrl("/pages");
            },
            error: (err) => {
              this.loader.hideLoader();
              const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong!';
              this.toastService.open(message, 'error');
            }
          })
        );
        break;
    }
  }
}
