import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { UserService } from '@shared/_http/user_master.service';
import { BlacklistedUsersData } from '@shared/configs/ngo-master-config';
import { requestStatusCard } from '@shared/configs/requests-config';
import { RowData } from '@shared/models/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-block-list',
  templateUrl: './user-block-list.component.html',
  styleUrl: './user-block-list.component.scss'
})
export class USERBlockListComponent {
  userBlackListDetailsData: RowData = BlacklistedUsersData;
  requestStatusCard: any[] = requestStatusCard;
  subs: any;

  constructor(private router: Router, private ngoMasterservice: NgoControllerService,private userMasterController:UserService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllNgo();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllNgo() {
    this.subs.add(this.userMasterController.getAllUserBlackList().subscribe({
      next: (value) => {
        this.userBlackListDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/user-block-list/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.ngoMasterservice.deleteNgo(event).subscribe({
      next: (value) => {
        this.getAllNgo()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/user-block-list/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/user-block-list/view/${event}`)
  }

  handleCardClickAction(event: any){
    
  }
}