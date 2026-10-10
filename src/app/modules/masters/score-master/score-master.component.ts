import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StatusMasterService } from '@shared/_http/status.service';
import { ScoreSettingData } from '@shared/configs/score-setting-config';
import { StatusDetailsData } from '@shared/configs/status-config';
import { RowData } from '@shared/models/table';
import { LoaderService } from '@shared/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-master',
  templateUrl: './score-master.component.html',
  styleUrl: './score-master.component.scss'
})
export class ScoreMasterComponent {
  scoreBoardDetailsData: RowData = ScoreSettingData;
  subs: any;

  constructor(
    private router: Router, 
    private statusMasterController: StatusMasterService,
    public loader:LoaderService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllScroreBoard();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllScroreBoard() {
    // this.subs.add(this.statusMasterController.getAllScroreBoard().subscribe({
    //   next: (value) => {
    //     this.scoreBoardDetailsData.data = value.data;
    //   }
    // }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/status-master/create")
  }

  handleDeleteAction(event: any) {
    // this.subs.add(this.statusMasterController.deleteScoreBoard(event).subscribe({
    //   next: (value) => {
    //     this.getAllScroreBoard()
    //   }
    // }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/status-master/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/status-master/view/${event}`)
  }
}

