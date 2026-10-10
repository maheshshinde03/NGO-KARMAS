import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Import services and models
import { CountryService } from '@shared/_http/country.service';
import { ToastService } from '@shared/services/toast.service';
import { IFormStructure } from '@shared/models/form';
import { RowData } from '@shared/models/table';
import { responseMessages } from '@shared/constants/response-msgs.constant';
import { RoleDetails, RoleFormGroup } from '@shared/configs/permission-config';
import { PermissionControllerService } from '@shared/_http/permissions.service';
import { LoaderService } from '@shared/services/loader.service';
import { MenuService } from '@shared/_http/menu.service';

@Component({
  selector: 'app-modify-role',
  standalone: false,
  templateUrl: './modify-role.component.html',
  styleUrl: './modify-role.component.scss'
})
export class ModifyRoleComponent implements OnInit, AfterViewInit, OnDestroy {
  
  // Manages all subscriptions
  subs: Subscription = new Subscription();

  // Route context: 'create', 'edit', or 'view'
  routeName: string | undefined;

  // ID for edit/view operations
  routeId: string | null = null;

  // Structure for dynamic form generation
  roleSearchGroupStructure: IFormStructure[] = [];

  // Table configuration and data
  roleDetailsData: RowData = RoleDetails;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private roleControllerService: PermissionControllerService,
    private countryService: CountryService,
    private toastService: ToastService,
    private loader: LoaderService,
    private menuService: MenuService
  ) {}

  /**
   * Initializes form structure and extracts route details.
   */
  ngOnInit(): void {
    this.roleSearchGroupStructure = JSON.parse(JSON.stringify(RoleFormGroup));

    // Get route name (create/edit/view)
    this.activatedRoute.url.subscribe(urlSegments => {
      this.routeName = urlSegments[0]?.path;
    });

    // Get role ID from route (if available)
    this.activatedRoute.paramMap.subscribe(params => {
      this.routeId = params.get('id');
    });

    this.initialization();
  }

  /**
   * If editing or viewing a role, fetch role data after view initialization.
   */
  ngAfterViewInit(): void {
    if (this.routeId) {
      this.getRole();
    }
  }

  /**
   * Clean up subscriptions when component is destroyed.
   */
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Handles form initialization including setting dynamic dropdowns and disabling fields in view mode.
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
   * Populates dropdowns based on list name.
   * @param ele Form control object
   */
  setOptionValues(ele: IFormStructure): void {
    switch (ele.listName) {
      // Uncomment if country dropdown is used
      // case 'country':
      //   this.subs.add(this.countryService.getAllCountry().subscribe({
      //     next: value => {
      //       ele.listData = value.data;
      //     }
      //   }));
      //   break;

      case 'menu-set':
        this.subs.add(this.menuService.getAllMenu().subscribe({
          next: value => {
            ele.listData = value.data;
          }
        }));
        break;
    }
  }

  /**
   * Fetches role details by ID and populates the form with existing data.
   */
  getRole(): void {
    this.loader.showLoader();
    this.subs.add(this.roleControllerService.getAllRoleByID(this.routeId!).subscribe({
      next: value => {
        this.loader.hideLoader();
        this.roleDetailsData.data = value.data;
      },
      error: () => {
        this.loader.hideLoader();
      }
    }));
  }

  /**
   * Handles form submission logic for create and edit operations.
   * @param event Form submission event containing form data
   */
  handleSubmit(event: any): void {
    const formData = JSON.parse(JSON.stringify(event.formValue));
    this.loader.showLoader();

    switch (this.routeName) {
      case 'create':
        this.subs.add(this.roleControllerService.createRole(formData).subscribe({
          next: value => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl('/role');
          },
          error: err => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === err.error_message)?.message ?? 'Something went wrong!';
            this.toastService.open(message, 'error');
          }
        }));
        break;

      case 'edit':
        this.subs.add(this.roleControllerService.updateRole(formData, this.routeId!).subscribe({
          next: value => {
            this.loader.hideLoader();
            const message = responseMessages.codes.find(item => item.code === value.error_message)?.message ?? '';
            this.toastService.open(message, 'success');
            this.router.navigateByUrl('/role');
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
