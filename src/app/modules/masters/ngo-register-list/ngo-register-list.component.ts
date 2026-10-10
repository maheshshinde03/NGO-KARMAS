import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { NgoRegistrationDetailsData } from '@shared/configs/ngo-registration-config';
import { NgoControllerService } from '@shared/_http/ngo-master.service';

@Component({
  selector: 'app-ngo-register-list',
  templateUrl: './ngo-register-list.component.html',
  styleUrl: './ngo-register-list.component.scss'
})
export class NgoRegisterListComponent {
  ngoRegistrationDetailsData: RowData = NgoRegistrationDetailsData; // Table configuration
  subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private ngoControllerService: NgoControllerService,
    public loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.getAllNgoFields();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Fetch and bind all NGO fields to table
   */
  getAllNgoFields(): void {
    this.loader.showLoader();
    this.subs.add(
      this.ngoControllerService.getAllRegisterNgoList().subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.ngoRegistrationDetailsData.data = res.data;
        }, error: () => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Navigate to create page
   */
  handleCreateAction(): void {
    this.router.navigateByUrl('/verify-ngo-register-master/create');
  }

  /**
   * Delete NGO field and refresh
   * @param id ngo_field_id
   */
  handleDeleteAction(id: any): void {
    this.subs.add(
      this.ngoControllerService.deleteRegisterNgo(id).subscribe({
        next: () => this.getAllNgoFields()
      })
    );
  }

  /**
   * Navigate to edit page
   * @param id ngo_field_id
   */
  handleEditAction(id: any): void {
    this.router.navigateByUrl(`/verify-ngo-register-master/edit/${id}`);
  }

  /**
   * Navigate to view page
   * @param id ngo_field_id
   */
  handleViewAction(id: any): void {
    this.router.navigateByUrl(`/verify-ngo-register-master/view/${id}`);
  }
}
