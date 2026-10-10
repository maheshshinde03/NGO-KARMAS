import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgoControllerService } from '@shared/_http/ngo-master.service';
import { BlacklistedUsersData } from '@shared/configs/ngo-master-config';
import { requestStatusCard } from '@shared/configs/requests-config';
import { RowData } from '@shared/models/table';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ngo-block-list',
  templateUrl: './ngo-block-list.component.html',
  styleUrl: './ngo-block-list.component.scss'
})
export class NGOBlockListComponent {
  ngoBlackDetailsData: RowData = BlacklistedUsersData;
  requestStatusCard: any[] = requestStatusCard;
  subs: any;

  constructor(private router: Router, private ngoMasterservice: NgoControllerService) { }


  ngOnInit(): void {
    this.subs = new Subscription()
    this.getAllNgo();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  getAllNgo() {
    this.subs.add(this.ngoMasterservice.getAllNgoBlackList().subscribe({
      next: (value) => {
        this.ngoBlackDetailsData.data = value.data;
      }
    }))
  }


  handleCreateAction() {
    this.router.navigateByUrl("/ngo/create")
  }

  handleDeleteAction(event: any) {
    this.subs.add(this.ngoMasterservice.deleteNgo(event).subscribe({
      next: (value) => {
        this.getAllNgo()
      }
    }))
  }

  handleEditAction(event: any) {
    this.router.navigateByUrl(`/ngo/edit/${event}`)
  }

  handleViewAction(event: any) {
    this.router.navigateByUrl(`/ngo/view/${event}`)
  }

  handleCardClickAction(event: any) {

  }

  handleUnlockAction(event: any) {
    const formData = {
      ngo_id: event, // or event.id depending on your API
      is_blacklist: 0,
      blacklist_reason: ''
    };
    this.subs.add(
      this.ngoMasterservice.blockNgoById(formData).subscribe({
        next: () => {
          Swal.fire('Success', 'NGO unblacklisted successfully', 'success');
          this.getAllNgo();
        },
        error: () => {
          Swal.fire('Error', 'Something went wrong!', 'error');
        }
      })
    );
  }
}