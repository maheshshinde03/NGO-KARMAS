import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { ScoreMasterService } from '@shared/_http/score-setting.service';
import { ScoreBoardDetailsData } from '@shared/configs/score-board-config';
import { RowData } from '@shared/models/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-boards',
  templateUrl: './score-boards.component.html',
  styleUrl: './score-boards.component.scss'
})
export class ScoreBoardsComponent {
  scoreBoardDetailsData: RowData = ScoreBoardDetailsData;
  subs: any;

  constructor(private router: Router, private scoreMasterService: ScoreMasterService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllScroreBoard();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllScroreBoard() {
    this.subs.add(this.scoreMasterService.getAllScoreHistory().subscribe({
      next: (value) => {
        this.scoreBoardDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/score-board/create")
  }

  handleDeleteAction(event: any) {
    // this.subs.add(this.scoreMasterService.deleteScoreBoard(event).subscribe({
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

