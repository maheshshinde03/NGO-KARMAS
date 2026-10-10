import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { NgoTypeService } from '@shared/_http/ngo-type.service';
import { NgoTypeDetailsData } from '@shared/configs/ngo-type-config';

@Component({
  selector: 'app-ngo-types',
  standalone: false,
  templateUrl: './ngo-types.component.html',
  styleUrl: './ngo-types.component.scss'
})
export class NgoTypesComponent {
  ngoTypeDetailsData: RowData = NgoTypeDetailsData; // Table configuration
  subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private ngoTypeService: NgoTypeService,
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
      this.ngoTypeService.getAllNgoTypeId().subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.ngoTypeDetailsData.data = res.data;
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
    this.router.navigateByUrl('/ngo-type/create');
  }

  /**
   * Delete NGO field and refresh
   * @param id ngo_field_id
   */
  handleDeleteAction(id: any): void {
    this.subs.add(
      this.ngoTypeService.deleteNgoTypeId(id).subscribe({
        next: () => this.getAllNgoFields()
      })
    );
  }

  /**
   * Navigate to edit page
   * @param id ngo_field_id
   */
  handleEditAction(id: any): void {
    this.router.navigateByUrl(`/ngo-type/edit/${id}`);
  }

  /**
   * Navigate to view page
   * @param id ngo_field_id
   */
  handleViewAction(id: any): void {
    this.router.navigateByUrl(`/ngo-type/view/${id}`);
  }
}
