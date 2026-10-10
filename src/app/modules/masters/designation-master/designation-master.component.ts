import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DesignationMasterService } from '@shared/_http/designation-master.service';
import { DesignationDetailsData } from '@shared/configs/designation-master-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';


@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrl: './designation-master.component.scss'
})
export class DesignationMasterComponent {
  designationDetailsData: RowData = DesignationDetailsData; // Table configuration with headers
  subs: Subscription = new Subscription(); // Subscription management

  constructor(
    private router: Router,
    private designationService: DesignationMasterService,
    public loader:LoaderService
  ) {}

  ngOnInit(): void {
    this.getAllDesignations(); // Fetch data on initialization
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe(); // Clean up subscriptions
  }

  /**
   * Fetch all designations and bind to the table data
   */
  getAllDesignations(): void {
    this.loader.showLoader();
    this.subs.add(
      this.designationService.getAllDesignations().subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.designationDetailsData.data = res.data;
        },error: (err) => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Navigate to the create designation page
   */
  handleCreateAction(): void {
    this.router.navigateByUrl('/designation-master/create');
  }

  /**
   * Delete a designation by ID and refresh the table
   * @param id designation_id
   */
  handleDeleteAction(id: any): void {
    this.subs.add(
      this.designationService.deleteDesignation(id).subscribe({
        next: () => this.getAllDesignations()
      })
    );
  }

  /**
   * Navigate to the edit page for the selected designation
   * @param id designation_id
   */
  handleEditAction(id: any): void {
    this.router.navigateByUrl(`/designation-master/edit/${id}`);
  }

  /**
   * Navigate to the view page for the selected designation
   * @param id designation_id
   */
  handleViewAction(id: any): void {
    this.router.navigateByUrl(`/designation-master/view/${id}`);
  }
}