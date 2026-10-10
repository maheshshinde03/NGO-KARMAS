import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GiftAndRewardControllerService } from '@shared/_http/giftAndReward-master.service';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { GiftAndRewardsDetailsData } from '@shared/configs/gift-reward-config';
import { RowData } from '@shared/models/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gift-reward',
  templateUrl: './gift-reward.component.html',
  styleUrl: './gift-reward.component.scss'
})
export class GiftRewardComponent {
  giftAndRewardDetailsData: RowData = GiftAndRewardsDetailsData;
  subs: any;

  constructor(private router: Router, private giftAndRewardControllerService: GiftAndRewardControllerService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllScroreBoard();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllScroreBoard() {
    this.subs.add(this.giftAndRewardControllerService.getAllGiftAndReward().subscribe({
      next: (value) => {
        this.giftAndRewardDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/score-board/create")
  }

  handleDeleteAction(event: any) {
    // this.subs.add(this.ngoMasterservice.deleteScoreBoard(event).subscribe({
    //   next: (value) => {
    //     this.getAllScroreBoard()
    //   }
    // }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/score-board/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/score-board/view/${event}`)
  }
}

