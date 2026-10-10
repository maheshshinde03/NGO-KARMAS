import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BonusMasterService } from '@shared/_http/bonus-master.service';
import { BonusMasterDetailsData } from '@shared/configs/bonus-master-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-bonus-master',
  templateUrl: './bonus-master.component.html',
  styleUrl: './bonus-master.component.scss'
})
export class BonusMasterComponent {
  bonusMasterDetailsData: RowData = BonusMasterDetailsData;
  subs: Subscription = new Subscription();

  constructor(
    private bonusMasterService: BonusMasterService,
    private router: Router,
    public loader: LoaderService
  ) { }

  ngOnInit(): void {
    this.getAllBonuses();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /**
   * Fetch all bonuses and bind to table
   */
  getAllBonuses(): void {
    this.loader.showLoader();
    this.subs.add(
      this.bonusMasterService.getAllBonuses().subscribe({
        next: (res) => {
          this.loader.hideLoader();
          this.bonusMasterDetailsData.data = res.data;
        }, error: () => {
          this.loader.showLoader();
        }
      })
    );
  }

  /**
   * Navigate to create page
   */
  handleCreateAction(): void {
    this.router.navigateByUrl('/score-setting/create');
  }

  /**
   * Navigate to edit page with selected bonus ID
   * @param id bonus_id
   */
  handleEditAction(id: any): void {
    this.router.navigateByUrl(`/score-setting/edit/${id}`);
  }

  /**
   * Navigate to view page with selected bonus ID
   * @param id bonus_id
   */
  handleViewAction(id: any): void {
    this.router.navigateByUrl(`/score-setting/view/${id}`);
  }

  /**
   * Delete a bonus and refresh the list
   * @param id bonus_id
   */
  handleDeleteAction(id: any): void {
    this.subs.add(
      this.bonusMasterService.deleteBonus(id).subscribe({
        next: () => this.getAllBonuses()
      })
    );
  }
}