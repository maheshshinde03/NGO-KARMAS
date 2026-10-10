import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgoFieldDetailsData } from '@shared/configs/ngo-field-config';
import { RowData } from '@shared/models/table';
import { NGOFieldService } from '@shared/_http/ngo-field.service';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-ngo-field-master',
  templateUrl: './ngo-field-master.component.html',
  styleUrl: './ngo-field-master.component.scss'
})
export class NgoFieldMasterComponent {
  ngoFieldDetailsData: RowData = NgoFieldDetailsData; // Table configuration
  subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private ngoFieldService: NGOFieldService,
    public loader:LoaderService
  ) {}

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
      this.ngoFieldService.getAllNGOField().subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.ngoFieldDetailsData.data = res.data;
        },error: () => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Navigate to create page
   */
  handleCreateAction(): void {
    this.router.navigateByUrl('/ngo-field/create');
  }

  /**
   * Delete NGO field and refresh
   * @param id ngo_field_id
   */
  handleDeleteAction(id: any): void {
    this.subs.add(
      this.ngoFieldService.deleteNGOField(id).subscribe({
        next: () => this.getAllNgoFields()
      })
    );
  }

  /**
   * Navigate to edit page
   * @param id ngo_field_id
   */
  handleEditAction(id: any): void {
    this.router.navigateByUrl(`/ngo-field/edit/${id}`);
  }

  /**
   * Navigate to view page
   * @param id ngo_field_id
   */
  handleViewAction(id: any): void {
    this.router.navigateByUrl(`/ngo-field/view/${id}`);
  }
}
