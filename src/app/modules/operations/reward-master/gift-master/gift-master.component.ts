import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GiftMasterService } from '@shared/_http/gift-master.service';
import { GiftMasterDetailsData } from '@shared/configs/gift-master-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gift-master',
  templateUrl: './gift-master.component.html',
  styleUrl: './gift-master.component.scss'
})
export class GiftMasterComponent {
  giftMasterDetailsData: RowData = GiftMasterDetailsData; // Table configuration
  subs: Subscription = new Subscription(); // To manage subscriptions

  constructor(private router: Router, private giftService: GiftMasterService,private loader:LoaderService) {}

  ngOnInit(): void {
    this.getAllGifts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe(); // Prevent memory leaks
  }

  /**
   * Fetch all gifts to display in the table
   */
  getAllGifts() {
    this.loader.showLoader();
    this.subs.add(
      this.giftService.getAllGifts().subscribe({
        next: (value) => {
          this.loader.hideLoader();
          this.giftMasterDetailsData.data = value.data;
        },error:(err) => {
          this.loader.hideLoader();
        }
      })
    );
  }

  /**
   * Navigate to create gift page
   */
  handleCreateAction() {
    this.router.navigateByUrl("/gift-master/create");
  }

  /**
   * Delete gift and refresh list
   * @param event gift_master_id
   */
  handleDeleteAction(event: any) {
    this.subs.add(
      this.giftService.deleteGift(event).subscribe({
        next: () => this.getAllGifts()
      })
    );
  }

  /**
   * Navigate to edit page
   * @param event gift_master_id
   */
  handleEditAction(event: any) {
    this.router.navigateByUrl(`/gift-master/edit/${event}`);
  }

  /**
   * Navigate to view page
   * @param event gift_master_id
   */
  handleViewAction(event: any) {
    this.router.navigateByUrl(`/gift-master/view/${event}`);
  }
}